const mongoose = require("mongoose");
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");
const Schema = mongoose.Schema;

const courseItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    itemId: {
        type: Number,
        required: true
    },
    sectionNo: {
        type: Number,
        required: true
    },
    posterId: {
        type: String,
        required: true
    },
    wantToGive: {
        type: Boolean,
        required: true
    },
    arrayOfFavoritesList: {
        type: [String],
        required: true
    },
    posterName: {
        type: String,
        required: true
    }
}, {timestamps: true});



const courseItemDB = mongoose.model("courseItemDB", courseItemSchema);

module.exports = courseItemDB;