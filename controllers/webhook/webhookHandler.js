const fetchWeatherData = require("../../utils/fetchWeatherData");
const MsgHook = require("../../whatsapp/MsgHook");
const sendWaMessage = require("../../whatsapp/sendWaMessage");

const webhookHandler = async (req, res) => {
  const waHookBody = req.body;
  if (MsgHook.isStatus(waHookBody)) {
    return res.status(200).end();
  }
  console.log(JSON.stringify(req.body, null, 2));
  if (MsgHook.isMsg(waHookBody)) {
    const msg = new MsgHook(waHookBody);
    if (msg.hasContext()) {
      await sendWaMessage(
        msg.getPhoneNumberId(),
        msg.getFrom(),
        "hey we recieved your message...."
      );
      return res.status(200).end();
    }
    await fetchWeatherData(msg.getMessage())
      .then((res) => {
        console.log("res", res);
        sendWaMessage(
          msg.getPhoneNumberId(),
          msg.getFrom(),
          ` ${
            res === undefined
              ? "What can we do for you today"
              : `current temperature in Kelvin:  ${res?.main?.temp}`
          } `
        );
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });

    return res.status(200).end();
  } else {
    return res.status(403).end();
  }
};

module.exports = webhookHandler;
