function handleSubmit(event) {
  event.preventDefault();
  let cityUser = document.querySelector("#city-input");
  cityUser = cityUser.value;
  search(cityUser);
}
function search(cityUser) {
  let urlApi = `https://api.shecodes.io/weather/v1/current?query=${cityUser}&key=4e3d43265f7f3448fot5bf7a6b40260b&units=metric`;
  axios.get(urlApi).then(showTemp);
  console.log(urlApi);
  let urlApiForecast = `https://api.shecodes.io/weather/v1/forecast?query=${cityUser}&key=4e3d43265f7f3448fot5bf7a6b40260b&units=metric`;
  axios.get(urlApiForecast).then(showForecast);
}
function showCurrent() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let urlApi = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=4e3d43265f7f3448fot5bf7a6b40260b&units=metric`;
  axios.get(urlApi).then(showTemp);
  let urlApiForecast = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=4e3d43265f7f3448fot5bf7a6b40260b&units=metric`;
  axios.get(urlApiForecast).then(showForecast);
}
function showForecast(response) {
  let forecast = response.data.daily;
  let weatherForecastElement = document.querySelector("#weather-forecast");
  let forecastHtml = "";
  //for (let i = 0; i < 9; i++) {
  for (let i = 1; i < forecast.length; i++) {
    forecastHtml += `<div class="col-2">
              <ul>
                <li class="other-day first">${formatDay(forecast[i].time)}</li>
                <li>
                  <img
                    src="${forecast[i].condition.icon_url}"
                    alt="${forecast[i].condition.icon}"
                    class="img"
                  />
                </li>
                <li>
                  <span class="max-temp">${Math.round(
                    forecast[i].temperature.maximum
                  )}°</span>
                  <span class="min-temp">${Math.round(
                    forecast[i].temperature.minimum
                  )}°</span>
                </li>
              </ul>
            </div>`;
  }
  console.log(forecastHtml);

  weatherForecastElement.innerHTML = forecastHtml;
}
function showTemp(response) {
  let tempRound = Math.round(response.data.temperature.current);
  let temperature = document.querySelector("#temperature");
  let weather = document.querySelector("#weather");
  let city = document.querySelector("#city");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let country = document.querySelector("#country");
  let iconElement = document.querySelector("#icon");

  temperature.innerHTML = tempRound;
  weather.innerHTML = response.data.condition.description;
  city.innerHTML = response.data.city;
  humidity.innerHTML = response.data.temperature.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  country.innerHTML = response.data.country;
  celsiusTemperature = tempRound;
  iconElement.setAttribute(
    "src",
    `https://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  if (
    response.data.condition.icon === "shower-rain-day" ||
    response.data.condition.icon === "shower-rain-night" ||
    response.data.condition.icon === "rain-day" ||
    response.data.condition.icon === "rain-night" ||
    response.data.condition.icon === "thunderstorm-day" ||
    response.data.condition.icon === "thunderstorm-night"
  ) {
    document.body.style.backgroundImage = "url('rain drops.webp')";
  } else {
    if (
      response.data.condition.icon === "clear-sky-day" ||
      response.data.condition.icon === "clear-sky-night"
    ) {
      document.body.style.backgroundImage = "url('sunny.jpg')";
    } else if (
      response.data.condition.icon === "snow-day" ||
      response.data.condition.icon === "snow-night"
    ) {
      document.body.style.backgroundImage = "url('snow_image.webp')";
    } else {
      if (
        response.data.condition.icon === "few-clouds-day" ||
        response.data.condition.icon === "few-clouds-night" ||
        response.data.condition.icon === "scattered-clouds-day" ||
        response.data.condition.icon === "scattered-clouds-night" ||
        response.data.condition.icon === "broken-clouds-day" ||
        response.data.condition.icon === "broken-clouds-night"
      ) {
        document.body.style.backgroundImage = "url('clouds.webp')";
      }
    }
  }

  console.log(response.data);
}
function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
  console.log(days[day]);
}
function formatData() {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = document.querySelector("#dayInWeek");
  day.innerHTML = days[now.getDay()];
  let hour = document.querySelector("#hour");
  hour.innerHTML = `${now.getHours()}`;
  if (now.getHours() < 10) {
    hour.innerHTML = `0${now.getHours()}`;
  }

  let minute = document.querySelector("#minute");
  minute.innerHTML = `${now.getMinutes()}`;
  if (now.getMinutes() < 10) {
    minute.innerHTML = `0${now.getMinutes()}`;
  }
}

let form = document.querySelector("#city-form");
form.addEventListener("submit", handleSubmit);
let currentButton = document.querySelector("#current");
currentButton.addEventListener("click", showCurrent);

formatData();
search("Zaporizhzhia");
