/* eslint-disable no-undef */

// check if user activated the process
const is_active = () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
  if (!data) return [];
  if (data.click_frequency === 0) return -1;
  return data.click_frequency ?? [];
};

// check and apply the process
try {
  (function frequency_based_sort() {
    document.addEventListener("click", (e) => {
      if (!list_of_unlimited_tags.includes(e.target.tagName)) return;
      if (is_active() === -1) return;
      const child = e.target;
      if (!e.target.parentNode) return;
      increase_frequency(child);
      const root_of_crowded_family = find_crowded_family(
        e.target.parentNode,
        e.target
      );
      if (root_of_crowded_family.children.length < 3) return;
      relocate_items(root_of_crowded_family.children);
    });
  })();
} catch (err) {
  console.log(err);
}

// add shortcut for deactivate
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && (event.key === ";" || event.key === "ک")) {
    if (is_active() !== -1) {
      console.log(
        "%c BIPA frequency counter deactivated, changing the ui locked!",
        "background: #f00; color: #fa0"
      );
      lock_reocord_frequency();
    }
  }
});

// add shortcut for activate
document.addEventListener("keydown", function (event) {
  if (event.ctrlKey && (event.key === "'" || event.key === "گ")) {
    if (is_active() === -1) {
      console.log(
        "%c BIPA frequency counter activated, changing the ui unlocked!",
        "background: #0f0; color: #efefef"
      );
      unlock_reocord_frequency();
    }
  }
});

// increase the frequency of the node
const increase_frequency = (node) => {
  const new_frequency = Number(node.getAttribute("frequency")) + 1 ?? 1;
  node.setAttribute("frequency", new_frequency);
  save_new_frequency(node);
};

// save data to the storage
const save_new_frequency = (node) => {
  const data = get_data();
  if (data.click_frequency === 0) return;
  const selector = node.getAttribute("id") ?? getElementPath(node);
  const frequency = node.getAttribute("frequency");
  if (!frequency) return;
  if (!Array.isArray(data.click_frequency)) return;
  const index = data.click_frequency.findIndex((x) => x.id === selector);

  if (index > -1) {
    data.click_frequency[index].frequency = frequency;
  } else {
    data.click_frequency.push({
      id: selector,
      frequency: frequency,
    });
  }

  set_data(data);
};

// get frequency of the node
const get_frequncy = (node) => {
  return Number(node.getAttribute("frequency"));
};

// create the DOM from root again
function relocate_items(children_of_root) {
  children_of_root = Array.prototype.slice.call(children_of_root);
  if (
    children_of_root.filter((item) =>
      list_of_unlimited_tags.includes(item.tagName)
    ).length !== children_of_root.length
  )
    return;

  const children_lower_2 = children_of_root.filter((i) => get_frequncy(i) < 5);
  const children_upper_2 = children_of_root.filter((i) => get_frequncy(i) >= 5);
  children_upper_2.sort(function (a, b) {
    return get_frequncy(a) > get_frequncy(b) ? -1 : 1;
  });
  const new_list = children_upper_2.concat(children_lower_2);
  for (var i = 0, len = new_list.length; i < len; i++) {
    var parent = new_list[i].parentNode;
    var detatchedItem = parent.removeChild(new_list[i]);
    parent.appendChild(detatchedItem);
  }
}

// find the root
function find_crowded_family(node, child) {
  if (node.children.length > 1) {
    increase_frequency(child);
    return node;
  }
  return find_crowded_family(node.parentNode, node);
}

const list_of_unlimited_tags = [
  "UL",
  "LI",
  "DIV",
  "BUTTON",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "A",
  "OPTION",
  "SELECT",
];
