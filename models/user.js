const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  name: String,
  food_choice_1: {
    type: String,
    enum: ['Mexican', 'Chinese', 'American']
  },
  food_choice_2: {
    type: String,
    enum: ['Mexican', 'Chinese', 'American']
  },
  food_choice_3: {
    type: String,
    enum: ['Mexican', 'Chinese', 'American']
  },
  diet_restriction: {
    type: String,
    enum: ['Vegan', 'Peanut Allergy', 'Vegetarian']
  }
});

const userSchema = new Schema({
  name: String,
  googleId: {
    type: String,
    required: true
  },
  email: String,
  avatar: String,
  zipcode: Number,
diet_restriction: {
    type: String,
    enum: ['Vegan', 'Peanut Allergy', 'Vegetarian']
  },
  food_choice_1: {
    type: String,
    enum: ['Mexican', 'Chinese', 'American']
  },
  food_choice_2: {
    type: String,
    enum: ['Mexican', 'Chinese', 'American']
  },
  food_choice_3: {
    type: String,
    enum: ['Mexican', 'Chinese', 'American']
  },
  friend: [friendSchema],
  saved_restaurants: [{type: Schema.Types.ObjectId, ref: 'Saved_restaurants'}] 
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);