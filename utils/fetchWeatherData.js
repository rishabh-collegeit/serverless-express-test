const axios = require("axios");
const extractLocationFromText = require("./extractLocationFromText");
const apiKey = "e35f988dfeccdc4c8e7ba37078d2457c";

async function fetchWeatherData(location) {
  try {
    const city = await extractLocationFromText(location);
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    console.log("API URL: ", apiUrl);
    
    const response = await axios.get(apiUrl);
    const weatherData = response.data;
    
    console.log("Weather Data:", weatherData);
    
    return weatherData;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return error.response ? error.response.data : null;
  }
}

module.exports = fetchWeatherData;
