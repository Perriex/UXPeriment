/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const STORAGE_KEY = "storage_uxperiment_bipa";
const storage = localStorage;

const is_frequency_active = () => {
  const data = JSON.parse(storage.getItem(STORAGE_KEY));
  if (!data) return [];
  return data.click_frequency ?? [];
};

// setup features and access to local storage.
(function start_config() {
  console.log("%c BIPA at your service ♥! ", "background: #555; color: #4fa");
  if (is_frequency_active() === 0) {
    console.log(
      "%c BIPA frequency counter is deactive.",
      "background: #f00; color: #fa0"
    );
  } else {
    console.log(
      "%c BIPA frequency counter is activate.",
      "background: #0f0; color: #040"
    );
  }
})();

const defaultObj = {
  urls: [],
  click_frequency: [],
};

(function setUpStorage() {
  if (!storage.getItem(STORAGE_KEY))
    storage.setItem(STORAGE_KEY, JSON.stringify(defaultObj));
})();

// data storage
const get_data = () => {
  const data = JSON.parse(storage.getItem(STORAGE_KEY));
  return data;
};

const is_data_available = () => {
  const data = getEventOFURLs();
  return data.length > 0;
};

const set_data = (data) => {
  storage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const lock_reocord_frequency = () => {
  const data = get_data();
  data.click_frequency = 0;
  storage.setItem(STORAGE_KEY, JSON.stringify(data));
};

const unlock_reocord_frequency = () => {
  const data = get_data();
  data.click_frequency = [];
  storage.setItem(STORAGE_KEY, JSON.stringify(data));
};
