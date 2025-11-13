// command-center.js
// refactored by ChatGPT

// In-memory collection of commanders (mirrors localStorage)
const commanders = {};

const STORAGE_KEYS = {
  commanders: "kic-commanders",
  activeCommander: "kic-active-commander"
};

function applyCommanderTheme(commander) {
  const root = document.documentElement;
  if (!commander || !commander.favoriteColor) {
    // fallback to default
    root.style.setProperty("--accent-color", "#facc15");
    return;
  }

  root.style.setProperty("--accent-color", commander.favoriteColor);
}


// ---------- LocalStorage helpers ----------

function loadCommandersFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.commanders);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") {
      Object.assign(commanders, parsed);
    }
  } catch (err) {
    console.error("Error loading commanders from storage:", err);
  }
}

function saveCommandersToStorage() {
  try {
    localStorage.setItem(STORAGE_KEYS.commanders, JSON.stringify(commanders));
  } catch (err) {
    console.error("Error saving commanders to storage:", err);
  }
}

function setActiveCommanderName(name) {
  try {
    localStorage.setItem(STORAGE_KEYS.activeCommander, name);
  } catch (err) {
    console.error("Error saving active commander:", err);
  }
}

function getActiveCommanderName() {
  return localStorage.getItem(STORAGE_KEYS.activeCommander) || null;
}

function getFirstCommanderName() {
  const names = Object.keys(commanders);
  return names.length > 0 ? names[0] : null;
}

// ---------- Commander dropdown (Settings) ----------

function populateCommanderDropdown(activeName) {
  const select = document.getElementById("select-commander");
  if (!select) return;

  // Clear existing options
  select.innerHTML = "";

  // Placeholder option
  const placeholder = document.createElement("option");
  placeholder.textContent = "Select Commander";
  placeholder.value = "";
  select.appendChild(placeholder);

  // Add one option per commander
  Object.keys(commanders).forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    if (name === activeName) {
      opt.selected = true;
    }
    select.appendChild(opt);
  });

  // Wire up change handler once
  if (!select.dataset.wired) {
    select.addEventListener("change", (e) => {
      const selectedName = e.target.value;
      if (!selectedName || !commanders[selectedName]) return;
      setActiveCommanderName(selectedName);
      showCommandCenter(selectedName);
    });
    select.dataset.wired = "true";
  }
}

// ---------- Validation / creation ----------

function validCommanderData() {
  const nameInput = document.getElementById("user-first-name");
  const bdayInput = document.getElementById("user-birthday");

  const hasName = !!nameInput?.value;
  const hasBirthday = !!bdayInput?.value;

  if (hasName && hasBirthday) return true;

  if (!hasName) {
    console.log("Please enter a commander name");
  }
  if (!hasBirthday) {
    console.log("Please enter a birthday");
  }

  return false;
}

function createCommander() {
  if (!validCommanderData()) return;

  const userFirstName     = document.getElementById("user-first-name").value;
  const userBirthday      = document.getElementById("user-birthday").value;
  const userFavoriteColor = document.getElementById("user-favorite-color").value;

  commanders[userFirstName] = {
    name:          userFirstName,
    birthdate:     userBirthday,
    favoriteColor: userFavoriteColor
  };

  console.log("Commanders:", commanders);

  // Persist to localStorage + set active
  saveCommandersToStorage();
  setActiveCommanderName(userFirstName);

  // Show their command center
  showCommandCenter(userFirstName);
}

// ---------- Show Command Center ----------

function showCommandCenter(commanderName) {
  const commander = commanders[commanderName];
  if (!commander) {
    console.warn("Commander not found:", commanderName);
    return;
  }

  // Hide welcome + sign-up/demo
  document.getElementById("new-user-sign-up")?.classList.add("hidden");
  document.getElementById("h1-welcome")?.classList.add("hidden");

  // Show command center
  document.getElementById("command-center")?.classList.remove("hidden");

  // Set name
  const nameEl = document.getElementById("commander-name");
  if (nameEl) {
    nameEl.innerText = commander.name;
  }

  // 🔥 Apply their theme color
  applyCommanderTheme(commander);

  // Initialize user widgets for THIS command center
  initWeatherWidget("weather-content");
  initDayInfoWidget("dayInfo-content");
  initHolidayCountdownWidget("calendar-content");

  // Update settings dropdown
  populateCommanderDropdown(commanderName);
}


// ---------- Init on page load ----------

function initCommandCenter() {
  // Wire up "Take Command Now" button
  const btn = document.getElementById("btn-command");
  if (btn) {
    btn.addEventListener("click", () => createCommander());
  }

  // Load any stored commanders
  loadCommandersFromStorage();

  // If we have commanders saved, auto-jump to command center
  const activeName = getActiveCommanderName() || getFirstCommanderName();
  if (activeName && commanders[activeName]) {
    showCommandCenter(activeName);
  } else {
    // No saved commanders → show welcome + demo (default HTML already does this)
    console.log("No saved commanders, staying on welcome screen.");
  }
}

// ---------- Reset to intial state ----------

function resetKiC() {
  // Clear localStorage
  try {
    localStorage.removeItem(STORAGE_KEYS.commanders);
    localStorage.removeItem(STORAGE_KEYS.activeCommander);
  } catch (err) {
    console.error("Error clearing KiC storage:", err);
  }

  // Clear in-memory commanders
  for (const key in commanders) {
    if (Object.prototype.hasOwnProperty.call(commanders, key)) {
      delete commanders[key];
    }
  }

  // Reset UI to welcome + demo
  document.getElementById("command-center")?.classList.add("hidden");
  document.getElementById("new-user-sign-up")?.classList.remove("hidden");
  document.getElementById("h1-welcome")?.classList.remove("hidden");

  // Clear commander name display
  const nameEl = document.getElementById("commander-name");
  if (nameEl) {
    nameEl.textContent = "";
  }

  // Reset commander dropdown
  const select = document.getElementById("select-commander");
  if (select) {
    select.innerHTML = `<option>Select Commander</option>`;
  }

  // 🔄 Reset theme to default
  const root = document.documentElement;
  root.style.setProperty("--accent-color", "#facc15");

  console.log("Kids in Command has been reset.");
}
