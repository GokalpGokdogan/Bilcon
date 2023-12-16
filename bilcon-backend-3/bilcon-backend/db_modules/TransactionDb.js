//require('dotenv').config();
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    itemId: {
        type: String,
        required: true
    },
    itemName: {
        type: String,
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
    customerRate: {
        type: Number,
        //required: true
    },
    posterRate: {
        type: Number,
        //required: true
    },
}, {timestamps: false});



const TransactionDB = mongoose.model("TransactionDB", transactionSchema);

module.exports = TransactionDB;