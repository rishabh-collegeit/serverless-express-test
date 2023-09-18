// const Mentor = require("../../models/Mentor");
// const MsgHook = require("../../whatsapp/MsgHook");
// const checkIfBlocked = require("./checkIfBlocked");
// const mentorReply = require("./mentorReply");
// const studentReply = require("./studentReply");

const MsgHook = require("../../whatsapp/MsgHook");
const sendWaMessage = require("../../whatsapp/sendWaMessage");

/**
 * The endpoint where whatsapp sends their webhook.
 *
 * We have subscribed to the following fields: messages
 *
 * So any time a message is sent on one of our business numbers,
 * we will receive a webhook from whatsapp on this route.
 *
 * This method is the entry point for any webhook related logic.
 *
 */
const webhookHandler = async (req, res) => {
    const waHookBody = req.body;
    if (MsgHook.isStatus(waHookBody)) {
        return res.status(200).end();
    }

    console.log(JSON.stringify(req.body, null, 2));
    sendWaMessage("116160598212405","918287233813","hy from the rishabh gaud...")
    // if (MsgHook.isMsg(waHookBody)) {
    //     const msg = new MsgHook(waHookBody);


    //     if (mentor) {
    //         await mentorReply(mentor, msg);
    //     } else {
    //         const isBlocked = await checkIfBlocked(msg.getFrom());
    //         if (!isBlocked) {
    //             await studentReply(msg);
    //         }
    //     }

        return res.status(200).end();
    // } else {
    //     return res.status(403).end();
    // }
};

module.exports = webhookHandler;
