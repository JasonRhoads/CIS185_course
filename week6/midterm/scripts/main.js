document.addEventListener("DOMContentLoaded", () => {
  // Commander creation / welcome → command center
  initCommandCenter();

  // Demo grid layout controller
  initGridDemo("demo", ".button-container button");

  // Demo widgets
  initWeatherWidget("demo-weather-content");
  initDayInfoWidget("demo-dayInfo-content");
  initHolidayCountdownWidget("demo-calendar-content");

  // Settings slide-out menu
  initSettingsMenu();
});
