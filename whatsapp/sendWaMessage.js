const waApi = require("./waApi");

/**
 * Send a whatsapp message to a receipent.
 *
 * This message can be sent only when the receipent has sent a message to us first.
 *
 * @param {string} senderNumberId sender whatsapp number id
 * @param {string} receipentNumber receipent whatsapp number
 * @param {string} message message to send
 * @returns {Promise} Promise object represents the response from whatsapp
 */
const sendWaMessage = (senderNumberId, receipentNumber, message) =>
    new Promise((resolve, reject) => {
        waApi
            .post(`${senderNumberId}/messages`, {
                messaging_product: "whatsapp",
                to: receipentNumber,
                text: {
                    body: message,
                },
            })
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err);
            });
    });

module.exports = sendWaMessage;
