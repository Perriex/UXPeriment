function changeBrightness(degree) {
  document.querySelector("body").style.filter = `brightness(${degree})`;
}

var initDegree = 100;

const calculate_decreasement = (precent, hours) => {
  return (hours * 60 * 60 * 1000) / precent;
};

(function auto_adjust_brightness() {
  window.addEventListener("DOMContentLoaded", function () {
    console.log("called intervall");
    setInterval(() => {
      initDegree -= 1;
      changeBrightness(`${initDegree}%`);
    }, calculate_decreasement(60, 2));
  });
})();
