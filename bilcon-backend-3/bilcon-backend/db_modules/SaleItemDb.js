const mongoose = require("mongoose");
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");
const Schema = mongoose.Schema;

const saleItemSchema = new Schema({
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
    arrayOfFavoritesList: {
        type: [String],
        required: true
    },
    posterName: {
        type: String,
        required: true
    }
}, {timestamps: true});

saleItemSchema.plugin(mongooseFuzzySearching, {
    fields: ['name'],
     // Give more weight to the 'name' field
  });

const saleItemDB = mongoose.model("saleItemDB", saleItemSchema);

module.exports = saleItemDB;