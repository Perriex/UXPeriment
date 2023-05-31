/* eslint-disable no-undef */

// shortcut for opening the megamenu
(function show_megamenu() {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "m") {
      const element = document.querySelectorAll("#bipa-menu-container")[0];
      element.setAttribute("class", "hide");
    }
  });
})();

// shortcut for closing the megamenu
(function hide_megamenu() {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === ",") {
      const element = document.querySelectorAll("#bipa-menu-container")[0];
      if (isDataAvailable()) element.removeAttribute("class");
    }
  });
})();

// saves the flow of links
(function record_megamenu() {
  document.addEventListener(`click`, (e) => {
    const origin = e.target.closest(`a`);
    if (origin) {
      // get after http://example.com/[]?..
      const link = origin.href.replace(/.*\/\/[^/]*(\/[^?]*).*/, "$1");

      const images = origin.querySelectorAll("img");

      const titles = origin.querySelectorAll(
        "h1, h2, h3, h4, h5, h6, p, small, b, strong"
      );

      const data = getData();
      const index = data.urls.findIndex((x) => x.address === link);

      if (index > -1) {
        data.urls[index].count = Number(data.urls[index].count) + 1;
      } else if (images.length > 0) {
        data.urls.push({
          address: link,
          type: "img",
          count: 0,
          value: images[0].src,
        });
      } else {
        data.urls.push({
          address: link,
          value: word_break(
            titles.length > 0 ? titles[0].innerText : origin.innerText
          ),
          type: "title",
          count: 0,
        });
      }
      setData(data);

      update_menu();
    }
  });
})();

function word_break(titles) {
  return titles.slice(0, 50) + (titles.length >= 50 ? "..." : "");
}

// add HTML to page
(async function inject_html() {
  fetch(chrome.runtime.getURL("../../html/megamenu.html"))
    .then((r) => r.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      update_menu();
    })
    .catch((err) => console.log(err));
})();

// create menu
function update_menu() {
  const container = document.getElementById("bipa-menu-container");
  container.className = "hide";

  const menu = document.getElementById("bipa-menu-list");
  while (menu.firstChild) {
    menu.removeChild(menu.firstChild);
  }
  const data = getEventOFURLs();
  data.forEach((element) => {
    const li = document.createElement("li");

    const link = document.createElement("a");
    link.href = element.address;
    if (element.type === "img") {
      const img = document.createElement("img");
      img.src = element.value;
      img.alt = "link";
      img.setAttribute("id", "bipa-img-wrapper");
      img.loading = "lazy";
      link.appendChild(img);
    }
    if (element.type === "title") {
      const p = document.createElement("p");
      p.innerText = element.value;
      link.appendChild(p);
    }

    li.appendChild(link);
    menu.appendChild(li);
  });
}

// sort data of MUL
const getEventOFURLs = () => {
  const data = getData();
  return data.urls
    .sort((p1, p2) => {
      if (p1.count < p2.count) return 1;
      if (p1.count > p2.count) return -1;
      return 0;
    })
    .filter((item) => item.address !== window.location.href && item.count > 0)
    .slice(0, 8);
};

// data storage
const STORAGE_KEY = "storage_uxperiment_bipa";

const getData = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return data;
};

const isDataAvailable = () => {
  const data = getEventOFURLs();
  return data.length > 0;
};

const setData = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const defaultObj = {
  urls: [],
};

(function setUpStorage() {
  if (!localStorage.getItem(STORAGE_KEY))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultObj));
})();
