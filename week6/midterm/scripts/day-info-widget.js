function formatDatePretty(date) {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const month = monthNames[date.getMonth()];
  const dayNum = date.getDate();

  const suffix =
    (dayNum % 10 === 1 && dayNum !== 11) ? "st" :
    (dayNum % 10 === 2 && dayNum !== 12) ? "nd" :
    (dayNum % 10 === 3 && dayNum !== 13) ? "rd" :
    "th";

  return `${month} ${dayNum}${suffix}`;
}

function getDayInfo() {
  const dayNames = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday"
  ];

  const today = new Date();
  const dayIndex = today.getDay();
  const dayName = dayNames[dayIndex];
  const prettyDate = formatDatePretty(today);

  const isWeekend = (dayIndex === 0 || dayIndex === 6);
  let message;
  let progressPercent;

  if (!isWeekend) {
    const daysUntilWeekend = 6 - dayIndex;
    message = daysUntilWeekend === 1
      ? "1 day until the weekend!"
      : `${daysUntilWeekend} days until the weekend!`;

    const daysPassed = dayIndex - 1; // Mon=1 → 0, Fri=5 → 4
    const totalDays = 5;             // Mon–Fri
    progressPercent = Math.max(0, Math.min(100, (daysPassed / totalDays) * 100));
  } else {
    const daysUntilMonday = (dayIndex === 6) ? 2 : 1;
    message = daysUntilMonday === 1
      ? "1 day until Monday."
      : `${daysUntilMonday} days until Monday.`;

    progressPercent = 100;
  }

  progressPercent = Math.round(progressPercent);

  return {
    prettyDate,
    dayName,
    message,
    progressPercent
  };
}

// Public init: pass container id
function initDayInfoWidget(containerId) {
  const info = getDayInfo();
  const box = document.getElementById(containerId);
  if (!box) return;

  box.innerHTML = `
    <p style="font-size:1.2rem; margin:0;">Today</p>
    <p style="font-size:1.6rem; font-weight:700; margin:0.2rem 0;">${info.prettyDate}</p>
    <p style="font-size:0.9rem; opacity:0.8; margin:0;">${info.dayName}</p>
    <p style="margin-top:0.8rem;">${info.message}</p>

    <div class="week-progress" aria-label="Progress toward the weekend">
      <div class="week-progress-bar" style="width: ${info.progressPercent}%;"></div>
    </div>
    <p class="week-progress-label">Weekend loading: ${info.progressPercent}%</p>
  `;
}
