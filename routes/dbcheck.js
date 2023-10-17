const router = require("express").Router();
const dbConnect = require("../middleware/dbConnect");
const controller = require("../controllers/contacts");
const asyncHandler = require("express-async-handler");

router.get("/info", dbConnect, asyncHandler(controller.getMentorsInfo));
router.post("/", dbConnect, asyncHandler(controller.createContact));
module.exports = router;
