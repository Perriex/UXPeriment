(function start() {
  // todo
  // add loading when changing order in html


  const STORAGE_KEY2 = "storage_uxperiment_bipa";

  (function add_attributes_to_all() {
    const targetNode = document.querySelector("body");

    const observer = new MutationObserver(function () {
      const data = get_data_frequency();

      // select elements without id
      const elementsWithoutId = document.querySelectorAll(
        `${list_of_unlimited_tags.join(":not([id]), ").toLowerCase()}`
      );
      elementsWithoutId.forEach((element) => {
        if (element.textContent)
          element.id = `generated-id-${getElementPath(element)}`;
        const frequency = data?.filter((item) => item.id === element.id);
        if (frequency && frequency[0]) {
          // if there was a frequency, add to the element
          element.setAttribute("frequency", frequency[0].frequency);
          const root_of_crowded_family = find_root_node(element);
          if (root_of_crowded_family.children.length < 3) return;
          sort_on_frequency(root_of_crowded_family.children);
        }
      });
    });

    const config = { childList: true };

    observer.observe(targetNode, config);
  })();

  // find the father of the tree
  function find_root_node(node) {
    if (node.children.length > 1) {
      return node;
    }
    return find_root_node(node.parentNode);
  }

  // relocate elemets based on the frequency
  function sort_on_frequency(children_of_root) {
    children_of_root = Array.prototype.slice.call(children_of_root);
    if (
      children_of_root.filter((item) =>
        list_of_unlimited_tags.includes(item.tagName)
      ).length !== children_of_root.length
    )
      return;

    children_of_root.sort(function (a, b) {
      return Number(a.getAttribute("frequency")) >
        Number(b.getAttribute("frequency"))
        ? -1
        : 1;
    });
    for (var i = 0, len = children_of_root.length; i < len; i++) {
      var parent = children_of_root[i].parentNode;
      var detatchedItem = parent.removeChild(children_of_root[i]);
      parent.appendChild(detatchedItem);
    }
  }

  const get_data_frequency = () => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY2));
    return data.click_frequency !== 0 ? data.click_frequency : [];
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
})();

// find the path to this element and generate a unique id
const getElementPath = function (el) {
  var path = el.nodeName;
  var parent = el.parentNode;
  let i = 5;
  while (parent && i) {
    path = parent.nodeName + "/" + path;
    parent = parent.parentNode;
    i--;
  }
  return path + "/:" + hashCode(el.textContent.slice(0, 100));
};

// hash of a string
function hashCode(str) {
  return Array.from(str).reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) | 0,
    0
  );
}
