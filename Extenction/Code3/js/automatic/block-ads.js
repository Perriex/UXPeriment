/* eslint-disable no-undef */

(function block_ads() {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/ublock-origin/ublock0.js";
  script.onload = function () {
    const ubo = new uBlock();
    ubo.ready(() => {
      ubo.setPermanentRules(["||example.com^$document"]);
    });
  };
  document.querySelector("head").appendChild(script);
})();

// todo
// add py.script