const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saved_restaurantsSchema = new Schema({
    name: {type: String, required: true},
}, {
  timestamps: true
});

module.exports = mongoose.model('Saved_restaurants', saved_restaurantsSchema);