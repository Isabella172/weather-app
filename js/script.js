const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", getWeather);

async function getWeather() {
  const city = cityInput.value;

  // 1️⃣ Get coordinates
  const geoResponse = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
  );
  const geoData = await geoResponse.json();

  const lat = geoData.results[0].latitude;
  const lon = geoData.results[0].longitude;

  // 2️⃣ Get weather
  const weatherResponse = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );
  const weatherData = await weatherResponse.json();

  console.log(weatherData);

  // 3️⃣ Display on screen
  document.getElementById("cityName").textContent = city;
  document.getElementById("temperature").textContent =
    weatherData.current_weather.temperature + "°C";
  document.getElementById("description").textContent =
    "Wind Speed: " + weatherData.current_weather.windspeed + " km/h";
}
