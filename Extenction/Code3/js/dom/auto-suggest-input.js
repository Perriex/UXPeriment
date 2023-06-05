/* eslint-disable no-undef */

(function record_user_input() {
  document.addEventListener("change", (e) => {
    if (forbidden_input_types.includes(e.target.type.toLowerCase())) return;

    const node = e.target;
    const location = window.location.href;
    const date = get_current_date();

    const extracted_data = {
      location,
      id: node.id || get_element_path(node),
      input: { [node.value]: { count: 1, date: date } },
      name: node.name,
      update_date: date,
      type: node.type,
    };

    if (node.type === "checkbox") {
      extracted_data.input[node.value].true = node.checked ? 1 : 0;
      extracted_data.input[node.value].false = !node.checked ? 1 : 0;
    }
    const data = get_data();

    let index = -1;
    index = data.saved_inputs.findIndex(
      (x) =>
        x.location === extracted_data.location &&
        x.type === extracted_data.type &&
        x.name === extracted_data.name
    );

    if (index < 0) {
      data.saved_inputs.push(extracted_data);
    } else {
      const record = data.saved_inputs[index];
      if (record.input[node.value]) {
        record.input[node.value].date = date;

        record.input[node.value].count = record.input[node.value].count
          ? record.input[node.value].count + 1
          : 1;

        if (record.type === "checkbox") {
          record.input[node.value].true += node.checked ? 1 : 0;
          record.input[node.value].false += !node.checked ? 1 : 0;
        }
      } else {
        record.input[node.value] = extracted_data.input[node.value];
        record.date = date;
      }
    }
    set_data(data);
  });
})();

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


/*
1- save everything by date so you can remove if it does not update*
2- remove old data (not recently used and frequency is less than 5)-> keep 2x more than you show*
3- for types of email, tel, radio, select, and statics -> just use date and frequency
4- for type of number, just use frequency(and also check of its accending or decending)
5- for type of text, split the inputs, count the words horizontally - then create new phrase or suggest word by word.
6- remove JUNK words
7- call onChange of the input when user choose our suggest box
8- if "5" was not ok, use frequency count of each phrasem
9- check validation/pattern/maz^min of the input before onchange -> preventing wrong enjection
10- use weighted average for word suggestion
11- 
*/

/*
 function trimArray(arr) {
  // count the frequency of each object
  const freq = arr.reduce((acc, obj) => {
    acc[obj.id] = (acc[obj.id] || 0) + 1;
    return acc;
  }, {});

  // sort the array by frequency and date
  const sortedArr = arr.sort(
    (a, b) => freq[a.id] - freq[b.id] || a.date - b.date
  );

  // trim the array to length 20
  const trimmedArr = sortedArr.slice(0, 20);

  return trimmedArr;
}
 */
