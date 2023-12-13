const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const customerSchema = new Schema({
    userObjectId: {
        type: String,
        required: true
    },
    arrayOfTransactionIds: {
        type: [String],
        required: true
    },
    arrayOfSaleItemFavoritesList: {
        type: [String],
        required: true
    },
    arrayOfRentItemFavoritesList: {
        type: [String],
        required: true
    },
    arrayOfPrivateLessonItemFavoritesList: {
        type: [String],
        required: true
    },
    arrayOfCourseItemFavoritesList: {
        type: [String],
        required: true
    }

}, {timestamps: true});


const customerDB = mongoose.model("customerDB", customerSchema);

module.exports = customerDB;