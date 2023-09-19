const axios = require("axios");
const extractLocationFromText = require("./extractLocationFromText");
const apiKey = "e35f988dfeccdc4c8e7ba37078d2457c";
const fetchWeatherData = async (location) => {

  //   const apiUrl =
  //     await `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  //   console.log("url >>>>>>> ", apiUrl);
  //   const data = await axios.get(apiUrl)
  //     .then((response) => {
  //       const weatherData = response.data;
  //       console.log("Weather Data:", weatherData);
  //       return weatherData;
  //     })
  //     .catch((error) => {
  //       return error.data;
  //     });
  //   const apiUrl =
  //     await `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  //   console.log("url >>>>>>> ", apiUrl);
  //   const data = await axios.get(apiUrl);
  const data = await extractLocationFromText(location)
    .then(async (city) => {
      const apiUrl = await`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
      return apiUrl;
    })
    .then(async (url) => {
        console.log("dsfsdfndsfs >>>>>>>>>>>>>> ",url);
      const data = await axios
        .get(url)
        .then((response) => {
          const weatherData = response.data;
          console.log("Weather Data:", weatherData);
          return weatherData;
        })
        .catch((error) => {
          return error.data;
        });
      return data;
    })
    .catch((error) => {
      return error.data;
    });

  return data;
};

module.exports = fetchWeatherData;
