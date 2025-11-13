const HOLIDAY_JSON_URL = "scripts/us-holidays.json";

function getNthWeekdayOfMonth(year, monthIndex, weekdayIndex, n) {
  if (n > 0) {
    const firstOfMonth = new Date(year, monthIndex, 1);
    const firstDay = firstOfMonth.getDay();
    const offset = (weekdayIndex - firstDay + 7) % 7;
    const day = 1 + offset + 7 * (n - 1);
    return new Date(year, monthIndex, day);
  } else {
    const lastOfMonth = new Date(year, monthIndex + 1, 0);
    const lastDay = lastOfMonth.getDay();
    const offset = (lastDay - weekdayIndex + 7) % 7;
    const day = lastOfMonth.getDate() - offset;
    return new Date(year, monthIndex, day);
  }
}

function getEasterSunday(year) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month - 1, day);
}

function getHolidayDateForYear(holiday, year) {
  if (holiday.movable) {
    return getEasterSunday(year);
  }

  const monthIndex = holiday.month - 1;

  if (typeof holiday.day === "number") {
    return new Date(year, monthIndex, holiday.day);
  }

  if (holiday.weekday && typeof holiday.week === "number") {
    const weekdayMap = {
      "Sunday": 0, "Monday": 1, "Tuesday": 2,
      "Wednesday": 3, "Thursday": 4, "Friday": 5, "Saturday": 6
    };
    const weekdayIndex = weekdayMap[holiday.weekday];
    return getNthWeekdayOfMonth(year, monthIndex, weekdayIndex, holiday.week);
  }

  return new Date(year, 0, 1);
}

function getNextOccurrence(holiday, now) {
  const year = now.getFullYear();
  let dateThisYear = getHolidayDateForYear(holiday, year);

  const todayMid = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const holidayMid = new Date(
    dateThisYear.getFullYear(),
    dateThisYear.getMonth(),
    dateThisYear.getDate()
  );

  if (holidayMid < todayMid) {
    dateThisYear = getHolidayDateForYear(holiday, year + 1);
  }

  return dateThisYear;
}

function formatCountdown(deltaMs) {
  const msPerMinute = 60 * 1000;
  const msPerHour   = 60 * msPerMinute;
  const msPerDay    = 24 * msPerHour;

  const days  = Math.floor(deltaMs / msPerDay);
  const rem1  = deltaMs % msPerDay;
  const hours = Math.floor(rem1 / msPerHour);
  const rem2  = rem1 % msPerHour;
  const mins  = Math.floor(rem2 / msPerMinute);

  return { days, hours, mins };
}

async function initHolidayCountdownWidget(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch(HOLIDAY_JSON_URL);
    if (!res.ok) throw new Error("Failed to load holidays JSON");
    const data = await res.json();
    const holidays = data.holidays || [];

    const now = new Date();

    const upcoming = holidays.map(h => {
      const nextDate = getNextOccurrence(h, now);
      const deltaMs = nextDate - now;
      return { holiday: h, date: nextDate, deltaMs };
    }).filter(item => item.deltaMs > 0)
      .sort((a, b) => a.date - b.date);

    if (upcoming.length === 0) {
      container.textContent = "No upcoming holidays found.";
      return;
    }

    const nextHoliday = upcoming[0];
    const following   = upcoming.slice(1);

    const msPerDay = 24 * 60 * 60 * 1000;
    const isClose = nextHoliday.deltaMs <= 7 * msPerDay;

    const countdown = formatCountdown(nextHoliday.deltaMs);
    const daysForLabel = Math.ceil(nextHoliday.deltaMs / msPerDay);
    const daysOnlyText = `${daysForLabel} day${daysForLabel === 1 ? "" : "s"}`;

    const mainCountdownText = isClose
      ? `${countdown.days} day${countdown.days === 1 ? "" : "s"}, ${countdown.hours} hour${countdown.hours === 1 ? "" : "s"}, ${countdown.mins} minute${countdown.mins === 1 ? "" : "s"}`
      : daysOnlyText;

    const options = { weekday: "short", month: "short", day: "numeric", year: "numeric" };
    const nextDateLabel = nextHoliday.date.toLocaleDateString(undefined, options);

    let html = `
      <div class="holiday-widget">
        <h3>Next Holiday</h3>
        <div class="holiday-next">
          <p class="holiday-name">${nextHoliday.holiday.name}</p>
          <p class="holiday-date">${nextDateLabel}</p>
          <p class="holiday-countdown">In ${mainCountdownText}</p>
          <p class="holiday-description">${nextHoliday.holiday.description || ""}</p>
        </div>
    `;

    if (following.length > 0) {
      html += `<h4>Coming Up</h4><ul class="holiday-list">`;
      html += following.map(item => {
        const d = item.date.toLocaleDateString(undefined, {
          month: "short",
          day: "numeric",
          year: "numeric"
        });
        const daysAway = Math.ceil(item.deltaMs / msPerDay);
        return `
          <li>
            <span class="holiday-list-name">${item.holiday.name}</span>
            <span class="holiday-list-date">${d}</span>
            <span class="holiday-list-count">${daysAway} day${daysAway === 1 ? "" : "s"}</span>
          </li>
        `;
      }).join("");
      html += `</ul>`;
    }

    html += `</div>`;

    container.innerHTML = html;
  } catch (err) {
    console.error(err);
    container.textContent = "Could not load holiday countdown.";
  }
}
