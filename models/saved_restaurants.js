const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saved_restaurantsSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  restaurant_name: String,
  address: String,
  cuisine: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Saved_restaurants', saved_restaurantsSchema);