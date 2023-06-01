/* eslint-disable no-undef */

(function frequency_based_sort() {
  document.addEventListener("click", (e) => {
    const child = e.target;
    if (!e.target.parentNode) return;
    increase_frequency(child);
    const root_of_crowded_family = find_crowded_family(e.target.parentNode);
    if (root_of_crowded_family.children.length < 3) return;
    relocate_items(root_of_crowded_family.children);
  });
})();

const increase_frequency = (node) => {
  const new_frequency = Number(node.getAttribute("frequency")) + 1 ?? 1;
  node.setAttribute("frequency", new_frequency);
  save_new_frequency(node);
};

function relocate_items(children_of_root) {
  children_of_root = Array.prototype.slice.call(children_of_root);
  if (
    children_of_root.filter((item) =>
      list_of_unlimited_tags.includes(item.tagName)
    ).length !== children_of_root.length
  )
    return;

  children_of_root.sort(function (a, b) {
    return get_frequncy(a) > get_frequncy(b) ? -1 : 1;
  });
  for (var i = 0, len = children_of_root.length; i < len; i++) {
    var parent = children_of_root[i].parentNode;
    var detatchedItem = parent.removeChild(children_of_root[i]);
    parent.appendChild(detatchedItem);
  }
}

const save_new_frequency = (node) => {
  const data = get_data();
  const selector = grenare_selector(node);
  const frequency = node.getAttribute("frequency");
  if (!frequency) return;
  const index = data.click_frequency.findIndex(
    (x) => x.id === selector && x.location === window.location.href
  );

  if (index > -1) {
    data.click_frequency[index].frequency = frequency;
  } else {
    data.click_frequency.push({
      id: selector,
      frequency: frequency,
      location: window.location.href,
    });
  }
  console.log(data.click_frequency, selector, frequency);

  set_data(data);
};

function grenare_selector(node) {
  console.log(node);
  let selector = "";
  const classes = node.getAttribute("class");
  const tagName = node.tagName;
  const id = node.getAttribute("id");
  if (tagName) selector += tagName.toLowerCase();
  if (id) selector += "#" + id;
  if (classes) selector += "." + classes;
  return selector;
}

function find_crowded_family(node) {
  if (node.children.length > 1) {
    return node;
  }
  increase_frequency(node);
  return find_crowded_family(node.parentNode);
}

const get_frequncy = (node) => {
  return Number(node.getAttribute("frequency"));
};

const list_of_unlimited_tags = [
  "UL",
  "LI",
  "DIV",
  "BUTTON",
  "SMALL",
  "BOLD",
  "H1",
  "H2",
  "H3",
  "H4",
  "H5",
  "H6",
  "A",
];
