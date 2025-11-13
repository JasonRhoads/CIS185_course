async function getDailyForecast() {
  let lat = 47.0379, lon = -122.9007; // Olympia fallback
  try {
    const pos = await new Promise((res, rej) =>
      navigator.geolocation.getCurrentPosition(res, rej, {
        enableHighAccuracy: true,
        timeout: 8000
      })
    );
    lat = pos.coords.latitude;
    lon = pos.coords.longitude;
  } catch (e) {
    console.warn("Geolocation denied, using fallback.");
  }

  const pointsResp = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
  if (!pointsResp.ok) throw new Error("NWS /points failed");
  const points = await pointsResp.json();

  const forecastUrl = points.properties.forecast;
  const office      = points.properties.cwa;
  const city        = points.properties.relativeLocation?.properties.city;
  const state       = points.properties.relativeLocation?.properties.state;

  const fcResp = await fetch(forecastUrl);
  if (!fcResp.ok) throw new Error("NWS forecast failed");
  const fc = await fcResp.json();
  const periods = fc.properties.periods;

  const dayMap = new Map();

  periods.forEach(p => {
    const dateStr = p.startTime.slice(0, 10); // 'YYYY-MM-DD'
    const dateObj = new Date(dateStr + "T00:00:00");
    if (!dayMap.has(dateStr)) {
      dayMap.set(dateStr, {
        dateStr,
        dateObj,
        periods: []
      });
    }
    dayMap.get(dateStr).periods.push(p);
  });

  const days = [...dayMap.values()]
    .sort((a, b) => a.dateObj - b.dateObj)
    .slice(0, 5)
    .map((d, idx) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const isToday = d.dateObj.getTime() === today.getTime();
      const labelBase = d.dateObj.toLocaleDateString(undefined, {
        weekday: "short",
        month: "short",
        day: "numeric"
      });

      let label;
      if (isToday) label = `Today – ${labelBase}`;
      else if (idx === 1) label = `Tomorrow – ${labelBase}`;
      else label = labelBase;

      return {
        label,
        dateObj: d.dateObj,
        periods: d.periods
      };
    });

  return { city, state, office, days };
}

// Public init: pass container id
function initWeatherWidget(containerId) {
  getDailyForecast()
    .then(data => {
      const container = document.getElementById(containerId);
      if (!container) return;

      const days = data.days;
      let currentIndex = 0;

      container.innerHTML = `
        <div class="weather-widget">
          <div class="weather-header">
            <h3>Weather for ${data.city}, ${data.state}</h3>
          </div>
          <div class="weather-body">
            <button class="weather-nav prev" aria-label="Previous day">&larr;</button>
            <div class="weather-slide" aria-live="polite"></div>
            <button class="weather-nav next" aria-label="Next day">&rarr;</button>
          </div>
          <div class="weather-footer">
            <span class="weather-counter"></span>
            <span class="weather-office">Forecast office: ${data.office}</span>
          </div>
        </div>
      `;

      const slideEl   = container.querySelector(".weather-slide");
      const counterEl = container.querySelector(".weather-counter");
      const prevBtn   = container.querySelector(".weather-nav.prev");
      const nextBtn   = container.querySelector(".weather-nav.next");

      function renderDay(index) {
        const total = days.length;
        if (total === 0) {
          slideEl.innerHTML = "<p>No forecast available.</p>";
          counterEl.textContent = "";
          return;
        }

        if (index < 0) index = total - 1;
        if (index >= total) index = 0;
        currentIndex = index;

        const day = days[currentIndex];

        const periodsHtml = day.periods.map(p => `
            <li class="weather-period">
              <div class="weather-period-name">${p.name}</div>
              <div class="weather-period-main">
                <span class="temp">${p.temperature}&deg;${p.temperatureUnit}</span>
                <span class="short">${p.shortForecast}</span>
              </div>
              <div class="weather-period-detail">${p.detailedForecast}</div>
              <div class="weather-period-wind">Wind: ${p.windSpeed} ${p.windDirection}</div>
            </li>
        `).join("");

        slideEl.innerHTML = `
          <h4>${day.label}</h4>
          <ul class="weather-periods">
            ${periodsHtml}
          </ul>
        `;

        counterEl.textContent = `${currentIndex + 1} / ${total}`;
      }

      prevBtn.addEventListener("click", () => renderDay(currentIndex - 1));
      nextBtn.addEventListener("click", () => renderDay(currentIndex + 1));

      renderDay(0);
    })
    .catch(err => {
      console.error(err);
      const div = document.getElementById(containerId);
      if (div) div.textContent = "Could not load weather data 😔";
    });
}
