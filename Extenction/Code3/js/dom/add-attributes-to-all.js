/* eslint-disable no-undef */
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
          element.id = `generated-id-${get_element_path(element)}`;
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

    const children_lower_2 = children_of_root.filter(
      (i) => Number(i.getAttribute("frequency")) < 5 // todo change it later
    );
    const children_upper_2 = children_of_root.filter(
      (i) => Number(i.getAttribute("frequency")) >= 5 // todo change it later
    );

    children_upper_2.sort(function (a, b) {
      return Number(a.getAttribute("frequency")) >
        Number(b.getAttribute("frequency"))
        ? -1
        : 1;
    });
    const new_list = children_upper_2.concat(children_lower_2);

    for (var i = 0, len = new_list.length; i < len; i++) {
      var parent = new_list[i].parentNode;
      var detatchedItem = parent.removeChild(new_list[i]);
      parent.appendChild(detatchedItem);
    }
  }

  const get_data_frequency = () => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY2));
    if (data) return data.click_frequency !== 0 ? data.click_frequency : [];
    return [];
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
    "OPTION",
    "SELECT",
    "INPUT",
    "FORM",
    "LABEL",
  ];
})();
