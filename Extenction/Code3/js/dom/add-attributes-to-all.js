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

      const inputElements = document.querySelectorAll("input");
      const saved_inputs = get_data().saved_inputs;

      inputElements.forEach((node) => {
        if (
          node.tagName === "INPUT" &&
          !forbidden_input_types.includes(node.type)
        ) {
          const page_records = saved_inputs.filter(
            (r) =>
              r.location === window.location.href &&
              r.type === node.type &&
              r.name === node.name
          );
          if (page_records.length > 0) {
            let suggested_inputs = [];

            const dataArray = Object.entries(page_records[0].input).map(
              ([key, value]) => ({
                key,
                ...value,
              })
            );

            dataArray.reverse().sort((a, b) => {
              const dateComparison = new Date(b.date) - new Date(a.date);
              if (dateComparison === 0) {
                return b.count - a.count;
              } else {
                return dateComparison;
              }
            });
            suggested_inputs = dataArray.map((item) => item.key).slice(0, 5);

            if (suggested_inputs.length === 0) return;

            const id_element = "BIPA-suggest-word-" + node.name;
            let dataList = document.querySelector("#" + id_element);
            if (!dataList) {
              dataList = document.createElement("datalist");
              dataList.innerHTML = "";
              node.setAttribute("autofilltype", "custom-autofill");
              node.setAttribute("list", id_element);
              dataList.id = id_element;
              suggested_inputs.forEach((el) => {
                let option = document.createElement("option");
                option.value = el;
                dataList.appendChild(option);
              });
              node.appendChild(dataList);
            }
          }
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

    children_upper_2.reverse().sort((a, b) => {
      const dateComparison = new Date(b.date) - new Date(a.date);
      if (dateComparison === 0) {
        return Number(a.getAttribute("frequency")) >
          Number(b.getAttribute("frequency"))
          ? -1
          : 1;
      } else {
        return dateComparison;
      }
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

  const forbidden_input_types = [
    "password",
    "submit",
    "reset",
    "hidden",
    "image",
    "button",
    "search",
    "color",
    "file",
    "select-multiple", // try on this later
  ];
})();
