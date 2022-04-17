function time() {
  let now = new Date();
  let dateTime = document.querySelector("#current-time");
  let date = now.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  dateTime.innerHTML = `${day}, ${date} ${month}, ${hours}:${minutes}`;
}
time();

function searchEngine(city) {
  let apiKey = "997f30ea63c7989ff9ae71ea98d23fea";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(`${apiUrl}`).then(currentWeather);
}

function searchCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#search-city");
  let city = document.querySelector("#search-city").value;
  searchEngine(city);
  let h1 = document.querySelector("#city-input");
  if (citySearch.value) {
    h1.innerHTML = `${citySearch.value}`;
  } else {
    h1.innerHTML = null;
    alert("Please, search a city");
  }
}

let city = document.querySelector("#search-form");
city.addEventListener("submit", searchCity);

function currentWeather(response) {
  let temperature = Math.round(response.data.main.temp);
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}`;
}

searchEngine();

function findCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKeyTwo = "997f30ea63c7989ff9ae71ea98d23fea";
  let apiUrlTwo = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKeyTwo}&units=metric`;
  axios.get(apiUrlTwo).then(currentWeather);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findCurrentLocation);
}

let currentPositionButton = document.querySelector("#current-position");
currentPositionButton.addEventListener("click", getCurrentPosition);

function celciusToFahrenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = 62.6;
}

function fahrenheitToCelsius(event) {
  event.preventDefault();
  let temp = document.querySelector("#current-temperature");
  temp.innerHTML = 17;
}

let linkFahrenheit = document.querySelector("#fahrenheit-temp");
linkFahrenheit.addEventListener("click", celciusToFahrenheit);

let linkCelsius = document.querySelector("#celsius-temp");
linkCelsius.addEventListener("click", fahrenheitToCelsius);

function weather() {
  let weather = {
    paris: { temperature: 12, humidity: 12 },
    london: { temperature: 9, humidity: 70 },
    lisboa: {
      temperature: 11,
      humidity: 50,
    },
    sydney: {
      temperature: 30,
      humidity: 2,
    },
    oslo: {
      temperature: 2,
      humidity: 10,
    },
    miami: {
      temperature: 22,
      humidity: 16,
    },
    cancun: {
      temperature: 35,
      humidity: 3,
    },
  };
  let city = prompt("Enter a city");
  city = city.toLowerCase();
  if (weather[city] !== undefined) {
    let temperatureC = weather[city].temperature;
    let hum = weather[city].humidity;
    alert(
      `It is currently ${temperatureC}°C in ${city} with a humidity of ${hum}%`
    );
  } else {
    alert(
      `Sorry, we do not know the weather for this city, try goint to https://www.google.com/search?q=weather+${city}`
    );
  }
}
