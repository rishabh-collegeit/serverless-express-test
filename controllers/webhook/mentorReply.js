const {
  conversationStatus,
  messageType,
  specialMessage,
} = require("../../utils/constants");
const Conversation = require("../../models/Conversation");
const Mentor = require("../../models/Mentor");
const hasBeen24Hours = require("../../utils/time");
const MsgHook = require("../../whatsapp/MsgHook");
const sendWaMessage = require("../../whatsapp/sendWaMessage");
const AWS = require("aws-sdk");
const waApi = require("../../whatsapp/waApi");
const Template = require("../../whatsapp/Template");

/**
 * Handle mentor's reply
 * @param {Mentor} mentor Mentor who sent the message
 * @param {MsgHook} msg Message sent by the mentor
 */
const mentorReply = async (mentor, msg) => {
  console.log("Message from mentor");
  console.log(mentor.name, msg.getMessage());

  if (!msg.hasContext()) {
    console.log("No context found");
    await sendWaMessage(
      msg.getPhoneNumberId(),
      msg.getFrom(),
      "Please swipe reply on a message from a student to reply to them."
    );
    return;
  }
  // msg has context
  // * special message check

  let templateReply = null;
  let messageReply = null;

  templateReply = await Conversation.findOne({
    waMessageId: msg.getContextMsgId(),
    status: conversationStatus.ONGOING,
    mentorPhone: mentor.phone,
  }).exec();

  console.log("Template reply", templateReply);

  if (!templateReply) {
    messageReply = await Conversation.findOne({
      status: conversationStatus.ONGOING,
      mentorPhone: mentor.phone,
      "messages.waMessageId": msg.getContextMsgId(),
    });
    console.log("Message reply", messageReply);
  }

  const conversation = templateReply || messageReply;

  if (!conversation) {
    console.log("No conversation found");
    await sendWaMessage(
      msg.getPhoneNumberId(),
      msg.getFrom(),
      "You are either not connected to a student or the student has ended the conversation."
    );
    return;
  }

  console.log("Conversation", {
    name: conversation.name,
    phone: conversation.phone,
  });

  try {
    if (hasBeen24Hours(conversation.lastResponseStudent)) {
      console.log("24 hour since student's last response");
      // todo send reinitiate student
      const result = await waApi.post(
        `${msg.getPhoneNumberId()}/messages`,
        Template.helloWorld(conversation.phone)
      );
      conversation.messages.push({
        sender: messageType.MENTOR,
        message: msg.getMessage(),
        timestamp: Date.now(),
        waMessageId: result.data.messages[0].id,
      });
      conversation.lastResponseMentor = Date.now();
      await conversation.save();
      return;
    }

    const response = await sendWaMessage(
      msg.getPhoneNumberId(),
      conversation.phone,
      msg.getMessage()
    );
    conversation.messages.push({
      sender: messageType.MENTOR,
      message: msg.getMessage(),
      timestamp: Date.now(),
      waMessageId: response.messages[0].id,
    });
    conversation.lastResponseMentor = Date.now();
    await conversation.save();
    console.log("Message sent");
  } catch (e) {
    console.log(e);
    console.log("Error sending message");
  }
};

module.exports = mentorReply;
