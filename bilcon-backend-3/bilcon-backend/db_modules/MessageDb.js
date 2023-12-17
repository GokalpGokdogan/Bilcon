const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    
    participants: Array, // Array of user IDs participating in the conversation
    messages: [
        {
            sentFrom: {
            type: String,
            required : true
            },
            text: {
            type: String,
            required : true
            },
            timestamp: { type: Date, default: Date.now },
        }
    ]

}, {timestamps: true});

const MessageDB = mongoose.model("MessageDB", messageSchema);

module.exports = MessageDB;