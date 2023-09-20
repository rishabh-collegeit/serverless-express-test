const fetchWeatherData = require("../../utils/fetchWeatherData");
const MsgHook = require("../../whatsapp/MsgHook");
const sendWaMessage = require("../../whatsapp/sendWaMessage");
const { MongoClient } = require("mongodb");
const AWS = require("aws-sdk");
const stepfunctions = new AWS.StepFunctions();

const webhookHandler = async (req, res) => {
  const client = new MongoClient(
    `mongodb+srv://rishabh:collegeit@cluster0.qztw7an.mongodb.net/`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  try {
    // await client.connect();

    // const db = client.db('sample_training');
    // const collection = db.collection('companies');

    // const result = await collection.find().exec();
    // console.log(`result ${JSON.stringify(result)}`);

    const waHookBody = req.body;
    if (MsgHook.isStatus(waHookBody)) {
      return res.status(200).end();
    }

    console.log(JSON.stringify(req.body, null, 2));
    if (MsgHook.isMsg(waHookBody)) {
      const msg = new MsgHook(waHookBody);
      if (msg.hasContext()) {
        const stateMachineArn =
          "arn:aws:states:ap-south-1:877004590739:stateMachine:weatherTest";
        const params = {
          stateMachineArn: stateMachineArn,
          input: JSON.stringify({}),
        };
        await stepfunctions.startExecution(params).promise();
        return res.status(200).end();
      }
      await fetchWeatherData(msg.getMessage())
        .then((res) => {
          console.log("res", res);
          sendWaMessage(
            msg.getPhoneNumberId(),
            msg.getFrom(),
            ` ${
              res && res.main === undefined
                ? "What can we do for you today"
                : `current temperature in Kelvin:  ${res?.main?.temp}`
            } `
          );
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });

      // await client.close();

      return res.status(200).end();
    } else {
      return res.status(403).end();
    }
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  } finally {
    // await client.close();
  }
};

module.exports = webhookHandler;
