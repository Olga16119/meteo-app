function searhCity(city) {
  let apiKey = "ef0t819co4fbb2a23ffa030681b76557";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(updateWeather);
}

function updateWeather(responce) {
  console.log(responce.data);
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
}

function handleSearch(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");

  searhCity(searchInputElement.value);
}

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleSearch);

searhCity("Paris")