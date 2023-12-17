const Poster = require("../js_classes/Poster");
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const posterSchema = new Schema({
    userObjectId: {
        type: String,
        required: true
    },
    arrayOfSaleItemIds: {
        type: [String],
        required: true
    },
    arrayOfRentItemIds: {
        type: [String],
        required: true
    },
    arrayOfLostItemIds: {
        type: [String],
        required: true
    },
    arrayOfFoundItemIds: {
        type: [String],
        required: true
    },
    arrayOfPrivateLessonItemIds: {
        type: [String],
        required: true
    },
    arrayOfCourseItemIds: {
        type: [String],
        required: true
    },
    arrayOfTransactionIds: {
        type: [String],
        required: true
    }

}, {timestamps: true});


const posterDB = mongoose.model("posterDB", posterSchema);

module.exports = posterDB;