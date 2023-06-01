/// auto add lazy loading to all images on current page
(function add_lazy_loading() {
  window.addEventListener("DOMContentLoaded", function () {
    const arr = document.querySelectorAll("img, iframe");
    arr.forEach((v) => {
      v.setAttribute("loading", "lazy");
    });
  });
})();


// todo
// check internet speed and cancel large media

// todo
// check no-use UI and delete them