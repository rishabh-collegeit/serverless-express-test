const asyncHandler = require("express-async-handler");
const verifyToken = require("../controllers/webhook/verifyToken");
const webhookHandler = require("../controllers/webhook/webhookHandler");
const router = require("express").Router();


router.get("/", asyncHandler(verifyToken));

router.post("/", asyncHandler(webhookHandler));

module.exports = router;
