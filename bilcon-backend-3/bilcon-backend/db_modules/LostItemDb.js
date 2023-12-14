const mongoose = require("mongoose");
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");
const Schema = mongoose.Schema;

const lostItemSchema = new Schema({
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
    place: {
        type: String,
        required: true
    },
    posterId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    posterName: {
        type: String,
        required: true
    }

}, {timestamps: true});

lostItemSchema.plugin(mongooseFuzzySearching, {
    fields: ['name'],
     // Give more weight to the 'name' field
  });

const lostItemDB = mongoose.model("lostItemDB", lostItemSchema);

module.exports = lostItemDB;