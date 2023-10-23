const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const controller = require("../controllers/conversation");
const useDb = require("../middlewares/useDb");
/**
 * Create a conversation
 * @route POST /conversation
 */
router.post(
    "/",
    useDb,
    asyncHandler(controller.createConversation)
);