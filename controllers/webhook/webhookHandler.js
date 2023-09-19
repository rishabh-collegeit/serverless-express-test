const fetchWeatherData = require("../../utils/fetchWeatherData");
const MsgHook = require("../../whatsapp/MsgHook");
const sendWaMessage = require("../../whatsapp/sendWaMessage");
// const axios = require("axios");

const webhookHandler = async (req, res) => {
  const waHookBody = req.body;
  if (MsgHook.isStatus(waHookBody)) {
    return res.status(200).end();
  }
  console.log(JSON.stringify(req.body, null, 2));
  if (MsgHook.isMsg(waHookBody)) {
    const msg = new MsgHook(waHookBody);
    if (msg.hasContext()) {
      // Example usage:
      await fetchWeatherData(msg.getMessage())
        .then((res) => {
          console.log("res", res);
          sendWaMessage(
            msg.getPhoneNumberId(),
            msg.getFrom(),
            ` ${msg.getContextMsgFrom()}: ${
              res === undefined ? "What can we do for you today" : `current temperature in farhen ${res?.main?.temp}` 
            } `
          );
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
      //   const userInput = "WEATHER New York";
      //   const location = await extractLocationFromText(msg.getMessage());
      //   const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
      //   const Data = await axios
      //     .get(apiUrl)
      //     .then((response) => {
      //       const weatherData = response.data;
      //       console.log("Weather Data:", weatherData);
      //       return weatherData;
      //     })
      //     .then((res) => {
      //       sendWaMessage(
      //         msg.getPhoneNumberId(),
      //         msg.getFrom(),
      //         ` ${msg.getContextMsgFrom()}: ${
      //           res === null ? "enter correct" : res.main.temp
      //         } hey we recieved your  reply message.... `
      //       );
      //     })
      //     .catch((error) => {
      //       console.error("Error fetching weather data:", error);
      //     });
      //   console.log(Data);
      //   await sendWaMessage(
      //     msg.getPhoneNumberId(),
      //     msg.getFrom(),
      //     ` ${msg.getContextMsgFrom()}: ${Data} hey we recieved your  reply message.... `
      //   );
      return res.status(200).end();
    }
    await sendWaMessage(
      msg.getPhoneNumberId(),
      msg.getFrom(),
      "hey we recieved your message...."
    );
    return res.status(200).end();
  } else {
    return res.status(403).end();
  }
};

module.exports = webhookHandler;
