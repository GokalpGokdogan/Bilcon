//require('dotenv').config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    studentId: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
    type: Boolean,
    default: false,
    required: true
    },
    posterId: {
        type: String,
        required: true
    },
    customerId: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    raterCount: {
        type: String,
        required: true
    },
}, {timestamps: false});



const UserDB = mongoose.model("UserDB", userSchema);

module.exports = UserDB;