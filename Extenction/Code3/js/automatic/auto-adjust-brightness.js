function changeBrightness(degree) {
  document.querySelector("body").style.filter = `brightness(${degree})`;
}

var initDegree = 100;

const calculate_decreasement = (precent, hours) => {
  return (hours * 60 * 60 * 1000) / precent;
};

(function auto_adjust_brightness() {
  window.addEventListener("DOMContentLoaded", function () {
    setInterval(() => {
      if (initDegree <= 40) return;
      initDegree -= 1;
      changeBrightness(`${initDegree}%`);

      console.log(
        "%c BIPA watchs after you! the brightness of this page decreased.",
        "background: #e8b3d0; color: #080808"
      );
    }, calculate_decreasement(40, 2));
  });
})();

// todo
// reduce glare

// todo
// health care clock

// todo
// warn 20.20.20 rule

// todo
// add scale and standard coloring
