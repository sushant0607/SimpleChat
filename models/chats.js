const mongoose = require("mongoose");

const chatScheme = new mongoose.Schema({
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
        maxLength: 50
    },
    created_at: {
        type: Date,
        required: true
    }
})

const Chat = mongoose.model("chat", chatScheme);

module.exports = Chat;