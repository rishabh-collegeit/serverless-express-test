/**
 * Whatsapp sends a mode and verify_token query param.
 * This verify_token is the same as the one we set in the whatsapp business api.
 * Since we set the verify_token, we have the same verify_token in the .env file.
 *
 * We compare the verify_token from the .env file and the verify_token from the query param,
 * if they are the same, we send the challenge back to whatsapp but
 * if they are not the same, we send a 403 forbidden status
 *
 */
const verifyToken = async (req, res) => {
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
    console.log("got get request on webhook", req.query);

    if (mode && token) {
        if (mode === "subscribe" && token === "test") {
            console.log("WEBHOOK_VERIFIED");
            return res.status(200).send(challenge);
        }
        return res.sendStatus(403);
    }
    return res.sendStatus(404);
};

module.exports = verifyToken;
