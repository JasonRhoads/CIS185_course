
function initSettingsAccordion() {
  const items = document.querySelectorAll(".settings-item");

  items.forEach(item => {
    const titleBtn = item.querySelector(".settings-title");
    const content = item.querySelector(".settings-content");

    if (!titleBtn || !content) return;

    // Ensure content starts collapsed
    content.style.maxHeight = "0px";

    titleBtn.addEventListener("click", () => {
      const isOpen = item.classList.toggle("open");

      if (isOpen) {
        // Expand to content's scrollHeight
        content.style.maxHeight = (content.scrollHeight + 20) + "px";
      } else {
        // Collapse
        content.style.maxHeight = "0px";
      }
    });
  });
}



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

  // 🔽 Initialize accordion behavior
  initSettingsAccordion();

  initSettingsControls();
}


// Check settings menu for customization
function initSettingsControls() {
  // ---- Layout controls ----
  const layoutRadios = document.querySelectorAll('input[name="layout-choice"]');
  layoutRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      const layout = e.target.value;

      const commandCenterShell = document.getElementById("command-center-shell");
      if (commandCenterShell) {
        commandCenterShell.classList.remove("layout-one", "layout-two", "layout-three");
        commandCenterShell.classList.add(layout);
      }

      const cc = document.querySelector(".command-center");
      if (cc) {
        cc.classList.remove("layout-one", "layout-two", "layout-three");
        cc.classList.add(layout);
      }

      if (typeof getActiveCommanderName === "function" && typeof saveCommandersToStorage === "function") {
        const activeName = getActiveCommanderName();
        if (activeName && commanders[activeName]) {
          commanders[activeName].layout = layout;
          saveCommandersToStorage();
        }
      }
    });
  });

  // ---- Color controls ----
  const colorInputsConfig = [
    { id: "color-bg",     varName: "--bg-color",     key: "bgColor" },
    { id: "color-font",   varName: "--font-color",   key: "fontColor" },
    { id: "color-fav",    varName: "--fav-color",    key: "favColor" },
    { id: "color-accent", varName: "--accent-color", key: "accentColor" }
  ];

  colorInputsConfig.forEach(cfg => {
    const input = document.getElementById(cfg.id);
    if (!input) return;

    input.addEventListener("input", (e) => {
      const value = e.target.value;
      document.documentElement.style.setProperty(cfg.varName, value);

      if (typeof getActiveCommanderName === "function" && typeof saveCommandersToStorage === "function") {
        const activeName = getActiveCommanderName();
        if (activeName && commanders[activeName]) {
          const commander = commanders[activeName];
          commander.theme = commander.theme || {};
          commander.theme[cfg.key] = value;
          saveCommandersToStorage();
        }
      }
    });
  });

  // ---- Weather controls ----
  const latInput = document.getElementById("weather-lat");
  const lonInput = document.getElementById("weather-lon");
  const weatherSaveBtn = document.getElementById("weather-save");

  if (weatherSaveBtn) {
    weatherSaveBtn.addEventListener("click", () => {
      if (typeof getActiveCommanderName !== "function" || typeof saveCommandersToStorage !== "function") return;

      const activeName = getActiveCommanderName();
      if (!activeName || !commanders[activeName]) return;
      const commander = commanders[activeName];

      const lat = parseFloat(latInput.value);
      const lon = parseFloat(lonInput.value);

      if (!isNaN(lat) && !isNaN(lon)) {
        commander.weatherLocation = { lat, lon };
      } else {
        commander.weatherLocation = null;
      }

      saveCommandersToStorage();

      // Re-init weather widget in command center
      initWeatherWidget("weather-content", commander.weatherLocation || undefined);
    });
  }

  // ---- Calendar controls ----
  const eventNameInput = document.getElementById("calendar-event-name");
  const eventDateInput = document.getElementById("calendar-event-date");
  const addEventBtn    = document.getElementById("calendar-add-event");
  const eventList      = document.getElementById("calendar-event-list");

  function renderCommanderEvents(commander) {
    if (!eventList) return;
    eventList.innerHTML = "";
    const events = commander.specialDates || [];
    events.forEach(ev => {
      const li = document.createElement("li");
      li.textContent = `${ev.name} – ${ev.date}`;
      eventList.appendChild(li);
    });
  }

  if (addEventBtn) {
    addEventBtn.addEventListener("click", () => {
      if (typeof getActiveCommanderName !== "function" || typeof saveCommandersToStorage !== "function") return;

      const name = eventNameInput.value.trim();
      const date = eventDateInput.value;

      if (!name || !date) {
        alert("Please enter an event name and date.");
        return;
      }

      const activeName = getActiveCommanderName();
      if (!activeName || !commanders[activeName]) return;
      const commander = commanders[activeName];

      if (!Array.isArray(commander.specialDates)) {
        commander.specialDates = [];
      }
      commander.specialDates.push({ name, date });

      saveCommandersToStorage();
      renderCommanderEvents(commander);

      const extras = buildCommanderExtraEvents(commander);
      initHolidayCountdownWidget("calendar-content", extras);

      eventNameInput.value = "";
      eventDateInput.value = "";
    });
  }

  // Optional: when settings open, you could call renderCommanderEvents(...)
  // using the current active commander to pre-populate the list if you like.
}



