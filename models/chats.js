const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    msg: {
        type: String,
        required: true, // Add this to ensure `msg` is always present
        maxLength: 50
    },
    created_at: {
        type: Date,
        required: true,
        default: Date.now // Use default to auto-set timestamps
    }
});

const Chat = mongoose.model("Chat", chatSchema); // Capitalize model name for consistency

module.exports = Chat;
