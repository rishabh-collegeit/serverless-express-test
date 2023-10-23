const processMsg = require("./processMsg");

const isDev = process.env.ENV === "dev";

class Template {
    static helloWorld(to) {
        return {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "template",
            template: {
                name: "hello_world",
                language: {
                    code: "en_US",
                },
            },
        };
    }
    // end

    static #devInititateStudent(
        to,
        studentName,
        mentorName,
        mentorBio,
        mentorUniversity
    ) {
        return {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "template",
            template: {
                name: "conversation_initiate_student",
                language: {
                    code: "en_US",
                },
                components: [
                    {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: studentName,
                            },
                            {
                                type: "text",
                                text: mentorName,
                            },
                            {
                                type: "text",
                                text: mentorBio,
                            },
                            {
                                type: "text",
                                text: mentorUniversity,
                            },
                        ],
                    },
                ],
            },
        };
    }

    static initiateStudent(
        to,
        studentName,
        mentorName,
        mentorBio,
        mentorUniversity
    ) {
        if (isDev) {
            return this.#devInititateStudent(
                to,
                studentName,
                mentorName,
                mentorBio,
                mentorUniversity
            );
        }

        return {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "template",
            template: {
                name: "welcome_student_final",
                language: {
                    code: "en_US",
                },
                components: [
                    {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: studentName,
                            },
                            {
                                type: "text",
                                text: mentorName,
                            },
                        ],
                    },
                ],
            },
        };
    }
    // end

    static terimateMentor(to, studentName) {
        return {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "template",
            template: {
                name: "terminated_mentor",
                language: {
                    code: "en_US",
                },
                components: [
                    {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: studentName,
                            },
                        ],
                    },
                ],
            },
        };
    }
    // end

    static reinitiateMentor(to, studentName, message) {
        if (isDev) {
            return this.#devInititateStudent(
                to,
                "*Mentor Reinitiate*",
                studentName,
                message,
                "*End*"
            );
        }

        return {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "template",
            template: {
                name: "reinitiate_mentor",
                language: {
                    code: "en_US",
                },
                components: [
                    {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: studentName,
                            },
                            {
                                type: "text",
                                text: processMsg(message),
                            },
                        ],
                    },
                ],
            },
        };
    }
    // end

    static reinitiateStudent(to, mentorName, message) {
        if (isDev) {
            return this.#devInititateStudent(
                to,
                "*Student Reinitiate*",
                mentorName,
                message,
                "*End*"
            );
        }
        return {
            messaging_product: "whatsapp",
            recipient_type: "individual",
            to: to,
            type: "template",
            template: {
                name: "reinitiate_student",
                language: {
                    code: "en_US",
                },
                components: [
                    {
                        type: "body",
                        parameters: [
                            {
                                type: "text",
                                text: mentorName,
                            },
                            {
                                type: "text",
                                text: processMsg(message),
                            },
                        ],
                    },
                ],
            },
        };
    }
    // end
}

module.exports = Template;
