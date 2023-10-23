const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
        },
        phone: {
            type: String,
            required: true,
        },
        year: {
            type: String,
            default: new Date().getFullYear() + 1,
        },
        mentorId: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "mentors",
        },
        mentorName: {
            type: String,
            required: true,
        },
        mentorPhone: {
            type: String,
            required: true,
        },
        mentorEmail: {
            type: String,
            required: true,
        },
        businessPhone: {
            type: String,
            required: true,
        },
        waMessageId: {
            type: String,
            default: null,
        },
        lastResponseStudent: {
            type: Date,
            default: null,
        },
        lastResponseMentor: {
            type: Date,
            default: null,
        },
        university: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ["ongoing", "terminated"],
            required: true,
            default: "ongoing",
        },

        messages: {
            type: [
                {
                    sender: {
                        type: String,
                        enum: ["student", "mentor", "info"],
                        required: true,
                    },
                    message: {
                        type: String,
                        required: true,
                    },
                    timestamp: {
                        type: Date,
                        default: Date.now,
                    },
                    waMessageId: {
                        type: String,
                        required: true,
                        unique: true,
                    },
                },
            ],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("conversations-test", ConversationSchema);
