const mongoose = require("mongoose");
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");
const Schema = mongoose.Schema;

const foundItemSchema = new Schema({
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
    photo: {
        type: String,
        required: true
    } }, {timestamps: true});

foundItemSchema.plugin(mongooseFuzzySearching, {
    fields: ['name', 'definition'],
     // Give more weight to the 'name' field
  });

const foundItemDB = mongoose.model("foundItemDB", foundItemSchema);

module.exports = foundItemDB;