function searhCity(city) {
  let apiKey = "ef0t819co4fbb2a23ffa030681b76557";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeather);
}

function updateWeather(responce) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = responce.data.city;

  let temperature = responce.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temperature);

  let discriptionElement = document.querySelector("#description");
  discriptionElement.innerHTML = responce.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${responce.data.temperature.humidity}%`;

  let speedWindElement = document.querySelector("#speed");
  speedWindElement.innerHTML = `${responce.data.wind.speed}km/h`;

  let timeElement = document.querySelector("#time");
  let date = new Date(responce.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${responce.data.condition.icon_url}" class="icon"/>`;

  getForecast(responce.data.city);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function handleSearch(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");

  searhCity(searchInputElement.value);
}

function getForecast(city) {
  let apiKey = "ef0t819co4fbb2a23ffa030681b76557";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[date.getDate()];
}

function displayForecast(responce) {
  console.log(responce.data);
  let forecast = "";

  responce.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecast =
        forecast +
        `<div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <div >
            <img class="weather-forecast-icon" src="${
              day.condition.icon_url
            }" />
            </div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature"><strong>${Math.round(
                day.temperature.maximum
              )}°</strong></div>
              <div class="weather-forecast-temperature">${Math.round(
                day.temperature.minimum
              )}°</div>
            </div>
          </div>`;
    }
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecast;
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSearch);

searhCity("Paris");
