const mongoose = require("mongoose");
const mongooseFuzzySearching = require("mongoose-fuzzy-searching");
const Schema = mongoose.Schema;

const privateLessonItemSchema = new Schema({
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
    }
}, {timestamps: true});

privateLessonItemSchema.plugin(mongooseFuzzySearching, {
    fields: ['name', 'definition'],
     // Give more weight to the 'name' field
  });

const privateLessonItemDB = mongoose.model("privateLessonItemDB", privateLessonItemSchema);

module.exports = privateLessonItemDB;