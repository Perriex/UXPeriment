/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const STORAGE_KEY = "storage_uxperiment_bipa";
const storage = localStorage;

const is_frequency_active = () => {
  const data = JSON.parse(storage.getItem(STORAGE_KEY));
  if (!data) return [];
  return data.click_frequency ?? [];
};

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

const default_obj = {
  recent_urls: [],
  click_frequency: [],
  saved_inputs: [],
};

const check_pre_data = (pre_data, initial) => {
  if (!pre_data || !initial) return false;
  const keys1 = Object.keys(pre_data).sort();
  const keys2 = Object.keys(initial).sort();

  const missed_keys = [];
  for (let i = 0; i < keys1.length; i++) {
    if (keys1[i] !== keys2[i]) {
      missed_keys.push(keys2[i]);
    }
  }

  return missed_keys.length > 0 ? missed_keys : false;
};

(function setUpStorage() {
  const data = get_data();
  if (!data) {
    set_data(default_obj);
    return;
  }
  const missed_keys = check_pre_data(data, default_obj);
  if (missed_keys) {
    missed_keys.forEach((k) => {
      data[k] = [];
    });
    set_data(data);
  }
})();

// find the path to this element and generate a unique id
const get_element_path = function (el) {
  var path = el.nodeName;
  var parent = el.parentNode;
  let i = 8;
  while (parent && i) {
    path = parent.nodeName + "/" + path;
    parent = parent.parentNode;
    i--;
  }
  return path + "/:" + hash_code(el.innerText.slice(0, 100));
};

// hash of a string
function hash_code(str) {
  return Array.from(str).reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0
  );
}
