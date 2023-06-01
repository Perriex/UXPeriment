/* eslint-disable no-undef */
(function record_events() {
  chrome.tabs.onActivated.addListener(function (activeInfo) {
    console.log(activeInfo);
  });
})();
