const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: {
    type: String,
    unique: true,
  },
});

module.exports = mongoose.model("contacts", ContactSchema);
