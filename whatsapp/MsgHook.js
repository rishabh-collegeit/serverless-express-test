class MsgHook {
    waBody;

    static isMsg(waHookBody) {
        return (
            waHookBody &&
            waHookBody.object &&
            waHookBody.entry &&
            waHookBody.entry[0].changes &&
            waHookBody.entry[0].changes[0] &&
            waHookBody.entry[0].changes[0].value.messages &&
            waHookBody.entry[0].changes[0].value.messages[0]
        );
    }

    /**
     * Check if the webhook is a status update.
     * Status update is when the message is sent, delivered, read, etc.
     */
    static isStatus(waHookBody) {
        return (
            waHookBody &&
            waHookBody.object &&
            waHookBody.entry &&
            waHookBody.entry[0].changes &&
            waHookBody.entry[0].changes[0] &&
            waHookBody.entry[0].changes[0].value &&
            waHookBody.entry[0].changes[0].value.statuses
        );
    }

    constructor(waHookBody) {
        this.waBody = waHookBody;
    }

    getPhoneNumberId() {
        return this.waBody.entry[0].changes[0].value.metadata.phone_number_id;
    }

    getFrom() {
        return this.waBody.entry[0].changes[0].value.messages[0].from;
    }

    getMessage() {
        return this.waBody.entry[0].changes[0].value.messages[0].text.body;
    }

    hasContext() {
        return this.waBody.entry[0].changes[0].value.messages[0].context;
    }

    getContextMsgId() {
        return this.waBody.entry[0].changes[0].value.messages[0].context.id;
    }

    getContextMsgFrom() {
        return this.waBody.entry[0].changes[0].value.messages[0].context.from;
    }

    getMsgId() {
        return this.waBody.entry[0].changes[0].value.messages[0].id;
    }
}

module.exports = MsgHook;
