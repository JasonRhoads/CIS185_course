function initGridDemo(containerId, buttonsSelector) {
  const demoGridContainer = document.getElementById(containerId);
  if (!demoGridContainer) return;

  const demoButtons = document.querySelectorAll(buttonsSelector);

  function changeLayout(layout, btn) {
    demoGridContainer.classList.remove("layout-one", "layout-two", "layout-three");
    demoGridContainer.classList.add(layout);

    demoButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
  }

  const btn1 = document.getElementById("layout1");
  const btn2 = document.getElementById("layout2");
  const btn3 = document.getElementById("layout3");

  if (btn1) btn1.addEventListener("click", (e) => changeLayout("layout-one", e.target));
  if (btn2) btn2.addEventListener("click", (e) => changeLayout("layout-two", e.target));
  if (btn3) btn3.addEventListener("click", (e) => changeLayout("layout-three", e.target));
}
