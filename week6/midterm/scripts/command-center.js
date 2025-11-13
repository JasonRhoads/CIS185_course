// Create a collection of commanders (in-memory for now)
const commanders = {};

// Validate new commander form
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

// Create a new commander object
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

  console.log(commanders);

  showCommandCenter(commanders[userFirstName]);
}

// Show the command center for a commander
function showCommandCenter(commander) {
  document.getElementById("new-user-sign-up")?.classList.add("hidden");
  document.getElementById("h1-welcome")?.classList.add("hidden");
  document.getElementById("command-center")?.classList.remove("hidden");

  console.log(commander);

  const nameEl = document.getElementById("commander-name");
  if (nameEl) {
    nameEl.innerText = commander.name;
  }
}

// Wire up the button once DOM is ready
function initCommandCenter() {
  const btn = document.getElementById("btn-command");
  if (!btn) return;
  btn.addEventListener("click", () => createCommander());
}
