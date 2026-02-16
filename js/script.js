document.addEventListener("DOMContentLoaded", function () {

  const searchInput = document.getElementById("cityInput");
  const searchBtn = document.getElementById("searchBtn");

  //Set date automatically
const today = new Date();
const options = { 
  weekday: "long", 
  year: "numeric", 
  month: "short", 
  day: "numeric" 
};

  document.getElementById("date").textContent =
  today.toLocaleDateString("en-US", options);


  console.log("JS loaded");
  console.log(searchInput);
  console.log(searchBtn);

  searchBtn.addEventListener("click", async function () {
    
    const city = searchInput.value.trim();
    console.log("Searching for:", city);

    if (!city) return;

    try {
      //Get coordinates
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`;
      const geoResponse = await fetch(geoUrl);
      const geoData = await geoResponse.json();

      if (!geoData.results) {
        alert("City not found");
        return;
      }

      const { latitude, longitude } = geoData.results[0];

      //Get weather
      const weatherUrl =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;

      const weatherResponse = await fetch(weatherUrl);
      const weatherData = await weatherResponse.json();

      const temperature = weatherData.current_weather.temperature;
      const weatherCode = weatherData.current_weather.weathercode;

      document.getElementById("temp").textContent = temperature + "°";

      document.getElementById("cityName").textContent =
      geoData.results[0].name + ", " + geoData.results[0].country;


      console.log("Weather data:", weatherData);

    } catch (error) {
      console.error("Error:", error);
    }
  });

});
