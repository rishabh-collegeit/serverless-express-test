const fetchWeatherData = require("../../utils/fetchWeatherData");
const MsgHook = require("../../whatsapp/MsgHook");
const sendWaMessage = require("../../whatsapp/sendWaMessage");
const { MongoClient } = require("mongodb");
const AWS = require("aws-sdk");
const stepfunctions = new AWS.StepFunctions();

const webhookHandler = async (req, res) => {
  const client = new MongoClient(
    `mongodb+srv://collegeitadmin:collegeit@cluster0.hk14d.mongodb.net/collegeitdb?retryWrites=true`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  try {
    const waHookBody = req.body;
    if (MsgHook.isStatus(waHookBody)) {
      return res.status(200).end();
    }

    console.log(JSON.stringify(req.body, null, 2));
    if (MsgHook.isMsg(waHookBody)) {
      const msg = new MsgHook(waHookBody);
      const mentor = await Mentor.findOne({
        phone: msg.getFrom(),
      }).lean();
      if (mentor) {
        await mentorReply(mentor, msg);
      } else {
        const isBlocked = await checkIfBlocked(msg.getFrom());
        if (!isBlocked) {
          await studentReply(msg);
        }
      }

      return res.status(200).end();
    } else {
      return res.status(403).end();
    }
    // if (msg.hasContext()) {
    // const stateMachineArn =
    //   "arn:aws:states:ap-south-1:877004590739:stateMachine:weatherTest";
    // const params = {
    //   stateMachineArn: stateMachineArn,
    //   input: JSON.stringify({}),
    // };
    // await stepfunctions.startExecution(params).promise();
    // return res.status(200).end();
    // }
    // await fetchWeatherData(msg.getMessage())
    //   .then((res) => {
    //     console.log("res", res);
    //     sendWaMessage(
    //       msg.getPhoneNumberId(),
    //       msg.getFrom(),
    //       ` ${
    //         res && res.main === undefined
    //           ? "What can we do for you today"
    //           : `current temperature in Kelvin:  ${res?.main?.temp}`
    //       } `
    //     );
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching weather data:", error);
    //   });
    // await client.close();

    // return res.status(200).end();
    // } else {
    //   return res.status(403).end();
    // }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};

module.exports = webhookHandler;
