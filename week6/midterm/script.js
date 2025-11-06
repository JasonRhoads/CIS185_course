

const settingsMenu = document.getElementById("settings-menu");

document.getElementById("settings-menu-btn").addEventListener("click", () => settingsMenu.classList.add("visible"));

document.getElementById("menu-close").addEventListener("click", () => settingsMenu.classList.remove("visible"));