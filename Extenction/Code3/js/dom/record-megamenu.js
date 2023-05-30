/* eslint-disable no-undef */
const STORAGE_KEY = "storage_uxperiment_bipa";

(function record_megamenu() {
  document.addEventListener(`click`, (e) => {
    const origin = e.target.closest(`a`);
    if (origin) {
      const data = getData();
      const link = origin.href.replace(/.*\/\/[^/]*(\/[^?]*).*/, "$1");

      const index = data?.urls.findIndex((x) => x.address === link);

      // todo
      // add image link

      console.log(origin);
      
      if (index === -1 && origin.innerText) {
        data.urls.push({
          address: link,
          name:
            origin.innerText.slice(0, 50) +
            (origin.innerText.length >= 50 ? "..." : ""),
          count: 1,
        });
      } else if (index >= 0) {
        data.urls[index].count = Number(data.urls[index].count) + 1;
      }
      setData(data);
      update_menu();
    }
  });
})();

(async function inject_html() {
  fetch(chrome.runtime.getURL("../../html/megamenu.html"))
    .then((r) => r.text())
    .then((html) => {
      document.body.insertAdjacentHTML("beforeend", html);
      update_menu();
    })
    .catch((err) => console.log(err));
})();

function update_menu() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  const menu = document.getElementById("bipa-menu-list");

  while (menu.firstChild) {
    menu.removeChild(menu.firstChild);
  }

  data.urls.forEach((element) => {
    const link = document.createElement("a");
    const p = document.createElement("p");
    link.href = element.address;
    p.innerText = element.name;

    link.appendChild(p);
    menu.appendChild(link);
  });
}

const getData = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return data;
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
