const mongoose = require("mongoose");
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");
const Schema = mongoose.Schema;

const rentItemSchema = new Schema({
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
    price: {
        type: Number,
        required: true
    }, 
    posterId: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    durationOfPrice: {
        type: String,
        required: true
    },
    availabilityScalar: {
        type: Number,
        required: true
    },
    availabilityDuration: {
        type: String,
        required: true
    },
    arrayOfFavoritesList: {
        type: [String],
        required: true
    }

}, {timestamps: true});

rentItemSchema.plugin(mongooseFuzzySearching, {
    fields: ['name', 'definition'],
     // Give more weight to the 'name' field
  });

const rentItemDB = mongoose.model("rentItemDB", rentItemSchema);

module.exports = rentItemDB;