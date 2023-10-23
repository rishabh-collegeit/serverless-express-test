const Conversation = require("../models/Conversation");
const Mentor = require("../models/Mentor");
const waApi = require("../whatsapp/waApi");
const { getPhoneId } = require("../data/phone");
const phones = require("../data/phone");
const Template = require("../whatsapp/Template");
const { conversationStatus, messageType } = require("../utils/constants");
const { v4: uuid } = require("uuid");
const AWS = require("aws-sdk");
const lambda = new AWS.Lambda();

const sendInitiateTemplate = async (conversation, mentor, businessPhoneId) => {
  const studentTemplate = Template.helloWorld(conversation.phone);
  console.log(studentTemplate);

  // const result =
  await waApi.post(`${businessPhoneId}/messages`, studentTemplate);

  // console.log(result.data.messages[0].id);
  // conversation.waMessageId = result.data.messages[0].id;
  await conversation.save();
};

/**
 * Create a conversation
 */
const createConversation = async (req, res) => {
  const newConversation = {
    name: req.body.name,
    email: req.body.email,
    mentorName: req.body.mentorName,
    phone: req.body.phone,
    mentorEmail: req.body.mentorEmail,
    mentorId: req.body.mentorId,
    university: req.body.university,
  };

  console.log(newConversation);
  // if mentor exists
  const mentor = await Mentor.findById(newConversation.mentorId);
  if (!mentor) {
    return res.status(400).json({
      message: "Mentor does not exist",
      ok: false,
    });
  }

  businessPhone = phones[0];

  if (!businessPhone) {
    return res.status(400).json({
      message: "University does not exist",
      ok: false,
    });
  }

  newConversation.businessPhone = businessPhone.number;
  newConversation.mentorPhone = mentor.phone;
  newConversation.mentorEmail = mentor.email;
  newConversation.mentorName = mentor.name;

  // check if conv exists
  const exists = await Conversation.findOne({
    phone: newConversation.phone,
    mentorId: newConversation.mentorId,
    businessPhone: businessPhone.number,
  });

  if (exists) {
    await sendInitiateTemplate(exists, mentor, businessPhone.id);

    if (exists.status === conversationStatus.TERMINATED) {
      exists.status = conversationStatus.ONGOING;
    }
    exists.messages.push({
      sender: messageType.INFO,
      message: "Conversation reinstated",
      timestamp: Date.now(),
      waMessageId: uuid(),
    });

    exists.name = newConversation.name;
    await exists.save();

    console.log("Conversation exists and reinstated");

    return res.status(200).json({
      message: "Conversation exists",
      conversation: exists,
    });
  }

  console.log(newConversation);

  // create
  const conversation = await (
    await Conversation.create(newConversation)
  ).populate();

  if (!conversation) {
    return res.status(400).json({
      message: "Failed to create conversation",
    });
  }

  conversation.messages.push({
    sender: messageType.INFO,
    message: "Conversation initiated",
    timestamp: Date.now(),
    waMessageId: uuid(),
  });

  await conversation.save();
  await sendInitiateTemplate(conversation, mentor, businessPhone.id);
  console.log("New conversation created by", conversation.name);

  return res.status(200).json({
    message: "Conversation created",
    conversation,
  });
};

module.exports = {
  createConversation,
};
