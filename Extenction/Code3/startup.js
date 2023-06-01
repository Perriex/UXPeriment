/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const STORAGE_KEY = "storage_uxperiment_bipa";

// setup features and access to local storage.
(function start_config() {
  console.log("%c BIPA at your service ♥! ", "background: #555; color: #4fa");
})();

const defaultObj = {
  urls: [],
  click_frequency: [],
};

(function setUpStorage() {
  if (!localStorage.getItem(STORAGE_KEY))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultObj));
})();

// data storage
const get_data = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  return data;
};

const is_data_available = () => {
  const data = getEventOFURLs();
  return data.length > 0;
};

const set_data = (data) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};
