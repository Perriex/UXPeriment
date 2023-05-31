const listOfClicks = [];

let recentHighlight = null;
let recentHighlightStyle = null;

// saves cursor click
(function event_catcher() {
  document.addEventListener(`click`, (e) => {
    let id = e.target.getAttribute("id");
    if (!id) {
      id = Math.ceil(Math.random() * 1000);
      e.target.setAttribute("id", id);
    }
    listOfClicks.push(e.target);
  });
})();

// scroll into view of last click
(function () {
  document.addEventListener("keydown", function (event) {
    if (event.ctrlKey && event.key === "b") {
      event.preventDefault();
      if (recentHighlight) {
        recentHighlight.style = recentHighlightStyle ?? {};
      }
      const lastTrack = listOfClicks.pop();

      recentHighlight = lastTrack;
      recentHighlightStyle = lastTrack?.style ?? {};
      if (lastTrack) {
        lastTrack.style["background-color"] = "yellow";
        lastTrack.style["color"] = "black";
        lastTrack.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "nearest",
        });
      } else {
        alert("BIPA: There is nothing else!");
      }
    }
  });
})();
