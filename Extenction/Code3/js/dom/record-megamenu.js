/* eslint-disable no-undef */

// todo
// add tree menu for large MUL
// remove old dates, add date to the data

// shortcut for opening the megamenu
(function show_megamenu() {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && (event.key === "m" || event.key === "ئ")) {
      const element = document.querySelector("#bipa-menu-container");
      element.setAttribute("class", "hide");
    }
  });
})();

// shortcut for closing the megamenu
(function hide_megamenu() {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && (event.key === "," || event.key === "و")) {
      const element = document.querySelector("#bipa-menu-container");
      if (is_data_available()) element.removeAttribute("class");
      else {
        console.log(
          "%c BIPA has no record of your flow on this website!",
          "background: #f0a0d0; color: #fb2b4b"
        );
      }
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

      const data = get_data();
      const index = data?.recent_urls.findIndex((x) => x.address === link);
      const date = get_current_date();

      if (index > -1) {
        data.recent_urls[index].count =
          Number(data.recent_urls[index].count) + 1;
        data.recent_urls[index].date = date;
      } else if (images.length > 0) {
        data.recent_urls.push({
          address: link,
          type: "img",
          count: 0,
          value: images[0].src,
          date: date,
        });
      } else if (link.length > 0) {
        data.recent_urls.push({
          address: link,
          value: word_break(
            titles.length > 0 ? titles[0].innerText : origin.innerText
          ),
          type: "title",
          count: 0,
          date: date,
        });
      }
      set_data(data);

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
  if (!menu) return;
  while (menu.firstChild) {
    menu.removeChild(menu.firstChild);
  }
  const data = get_event_of_URLs();
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
const get_event_of_URLs = () => {
  const data = get_data();

  return data.recent_urls
    .sort((a, b) => {
      const dateComparison = new Date(b.date) - new Date(a.date);
      if (dateComparison === 0) {
        return b.count - a.count;
      } else {
        return dateComparison;
      }
    })
    .filter((item) => item.address !== window.location.href && item.count > 0)
    .slice(0, 8); // todo change it later
};
