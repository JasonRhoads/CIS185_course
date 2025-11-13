function initSettingsMenu() {
  const settingsMenu = document.getElementById("settings-menu");
  const settingsBtn  = document.getElementById("settings-menu-btn");
  const closeBtn     = document.getElementById("menu-close");
  const resetBtn     = document.getElementById("btn-reset-kic");

  if (!settingsMenu || !settingsBtn || !closeBtn) return;

  let menuOpen = false;

  function openMenu() {
    settingsMenu.classList.add("visible", "slide-right");
    menuOpen = true;
  }

  function closeMenu() {
    settingsMenu.classList.remove("visible");
    menuOpen = false;
  }

  settingsBtn.addEventListener("click", () => {
    if (menuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  closeBtn.addEventListener("click", () => {
    closeMenu();
  });

  // Close if user clicks directly on the overlay
  window.addEventListener("click", (event) => {
    if (event.target === settingsMenu) {
      closeMenu();
      console.log("settings menu closed via overlay click");
    }
  });

  // 🔥 Reset button wiring
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      const sure = confirm("This will clear all commanders and reset Kids in Command. Are you sure?");
      if (!sure) return;
      if (typeof resetKiC === "function") {
        resetKiC();
      } else {
        console.warn("resetKiC() is not available.");
      }
      closeMenu();
    });
  }
}
