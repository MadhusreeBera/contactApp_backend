const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String },
    avatar: {
      type: String,
      default:
        "https://cdn2.vectorstock.com/i/1000x1000/02/71/profile-placeholder-default-avatar-girl-vector-23890271.jpg",
    },
    phone: { type: String },
    tag: { type: String },
    status: {
      type: String,
      default: "active",
      enum: ["active", "inactive"],
    },
  },
  { timestamps: true }
);

const Contact = mongoose.model("contact", contactSchema);
module.exports = Contact;
