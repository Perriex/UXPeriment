(function start() {
  const STORAGE_KEY2 = "storage_uxperiment_bipa";

  (function add_attributes_to_all() {
    const targetNode = document.querySelector("body");

    const observer = new MutationObserver(function () {
      const elementsWithoutId = document.querySelectorAll(":not([id])");
      elementsWithoutId.forEach((element, index) => {
        element.id = `generated-id-${index}`;
      });

      const data = get_data2().click_frequency;
      const items_with_frequency = data
        .filter((item) => item.location === window.location.href)
        .filter((selected) => selected.id.includes("#"));

      items_with_frequency.forEach((element) => {
        try {
          const ele = document.querySelector(element.id);

          if (ele) {
            ele.setAttribute("frequency", element.frequency);

            const root_of_crowded_family = find_crowded_family(ele);
            if (root_of_crowded_family.children.length < 3) return;
            relocate_items(root_of_crowded_family.children);
          }
          console.log(ele, element);
        } catch (err) {
          console.log("FU");
        }
      });
    });

    const config = { childList: true };

    observer.observe(targetNode, config);
  })();

  function find_crowded_family(node) {
    if (node.children.length > 1) {
      return node;
    }
    return find_crowded_family(node.parentNode);
  }

  function relocate_items(children_of_root) {
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

  const get_data2 = () => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY2));
    return data;
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
