const mongoose = require("mongoose");

const MentorSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: {
        type: String,
        unique: true,
    },
    linkedin: String,
    bio: String,
    platform_mentor: String,
    university_mentor: String,
    country: String,
    test_mentor: String,
    img_url_mobile: String,
    img_url_web: String,
    availability: String,
    university: String,
});

module.exports = mongoose.model("mentors", MentorSchema);
