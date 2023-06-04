(function auto_apply_flow() {
  console.log(
    document.addEventListener("change", (e) => {
      console.log(e, e.target, e.target.value);
    })
  );
})();
