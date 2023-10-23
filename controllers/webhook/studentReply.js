const { conversationStatus, messageType } = require("../../utils/constants");
const {
    getPhoneNumber,
    getPhoneId,
    isBusinessPhone,
} = require("../../data/phone");
const Conversation = require("../../models/Conversation");
const MsgHook = require("../../whatsapp/MsgHook");
const sendWaMessage = require("../../whatsapp/sendWaMessage");
const Template = require("../../whatsapp/Template");
const waApi = require("../../whatsapp/waApi");
const hasBeen24Hours = require("../../utils/time");
/**
 * Handle student's reply
 * @param {MsgHook} msg Message sent by the student
 */
const studentReply = async (msg) => {
    console.log("Message from student");

    const conversation = await Conversation.findOne({
        phone: msg.getFrom(),
        businessPhone: getPhoneNumber(msg.getPhoneNumberId()),
        status: conversationStatus.ONGOING,
    }).exec();

    if (!conversation) {
        console.log("No conversation found");

        await sendWaMessage(
            msg.getPhoneNumberId(),
            msg.getFrom(),
            "You are not connected to a mentor yet. \n\nPlease visit https://www.collegeit.org to get connected to a mentor."
        );

        return;
    }
    console.log(conversation.name, msg.getMessage());

    const studentSentAMessageBefore = conversation.messages.find(
        (m) => m.sender === messageType.STUDENT
    );

    try {
        if (
            !studentSentAMessageBefore ||
            hasBeen24Hours(conversation.lastResponseMentor)
        ) {
            console.log("First message of student or mentor has been 24 hours");
            // todo send reinitiate mentor
            const result =  await sendWaMessage(
                msg.getPhoneNumberId(),
                msg.mentorPhone(),
                msg.getMessage()
            );
    
            conversation.waMessageId = result.data.messages[0].id;

            conversation.messages.push({
                sender: messageType.STUDENT,
                message: msg.getMessage(),
                timestamp: Date.now(),
                waMessageId: result.data.messages[0].id,
            });
            conversation.lastResponseStudent = Date.now();

            await conversation.save();
            return;
        }

        const response = await sendWaMessage(
            getPhoneId(conversation.businessPhone),
            conversation.mentorPhone,
            `${conversation.name}: ${msg.getMessage()}`
        );

        console.log("Message sent");

        conversation.messages.push({
            sender: messageType.STUDENT,
            message: msg.getMessage(),
            timestamp: Date.now(),
            waMessageId: response.messages[0].id,
        });
        conversation.lastResponseStudent = Date.now();
        await conversation.save();
    } catch (err) {
        console.log(err);
        console.log("Error sending message");
    }
};

module.exports = studentReply;
