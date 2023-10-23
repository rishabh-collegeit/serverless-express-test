const serverless = require("serverless-http");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/webhook", require("./routes/webhook"));
app.use("/conversation", require("./routes/conversation"));
app.use("/mentors", require("./routes/dbcheck"));
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});

app.post("/path", async (req, res, next) => {
  const waApi = axios.create({
    baseURL: "https://graph.facebook.com/v17.0/",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer EAAPBQamOoc4BOZCIDxqSZAxayy4xetemrGL0tXz1741vnyukCiw1bru0rtKJ5TVkplWggP8SZC1eFtDPh8XFsrjjNB6ncXncZADYIo4qx4dWpi3wWxbf2y5ntwCTv5DAsg8bhAG2XMU7WUzSHphx4AnJCF0IYVkWELpM4yfNKcz3VjSIL3W8rdhx3cL5jsY0TQLSajccDl4TAAXIsLGCFbmCKIIZD`,
    },
  });
  const result = await waApi.post(`101789566131430/messages`, req.body);
  return result;
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});
module.exports.handler = serverless(app);
