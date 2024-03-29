// todo
// add pre/nxt button for switching between highlights

(function regex_search() {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && (event.key === "[" || event.key === "ج")) {
      let search = prompt("BIPA: Type here");

      highlightRegex(search);
      // todo
      // add previous and next
      const firstMatch = document.querySelectorAll(".BIPA-find-regex")[0];
      if (firstMatch)
        firstMatch.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
    }
  });
})();

(function remove_regex_highlights() {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && (event.key === "]" || event.key === "چ")) {
      const classes = document.querySelectorAll(".BIPA-find-regex");
      classes.forEach((div) => {
        div.style = {};

        div.classList.remove("BIPA-find-regex");
      });
    }
  });
})();

// process of searching all the DOM for the regex
function highlightRegex(regex) {
  const body = document.querySelector("body");

  const nodes = [];
  const walk = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);

  while (walk.nextNode()) {
    const node = walk.currentNode;
    const matches = RegExp(regex, "ig").exec(node.textContent);

    if (matches) {
      nodes.push({ node, matches });
    }
  }

  nodes.forEach(({ node, matches }) => {
    const highlighted = document.createElement("span");

    let lastIndex = 0;
    matches.forEach((match) => {
      const index = node.textContent.indexOf(match, lastIndex);
      const prefix = node.textContent.substring(lastIndex, index);
      const matched = node.textContent.substr(index, match.length);

      if (prefix) {
        highlighted.appendChild(document.createTextNode(prefix));
      }

      const span = document.createElement("span");
      span.textContent = matched;
      span.style.backgroundColor = "yellow";
      span.style.color = "black";
      span.className = "BIPA-find-regex";
      highlighted.appendChild(span);

      lastIndex = index + match.length;
    });

    const suffix = node.textContent.substring(lastIndex);

    if (suffix) {
      highlighted.appendChild(document.createTextNode(suffix));
    }

    node.replaceWith(highlighted);
  });
}
