const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;
const categories = require('./categories.json');

let restaurantCategories = {Mexican: "mexican, All", 
                            American: "newamerican, [SE, NO, GB, IE, US, DK]", 
                            Asian: "chinese, All", 
                            Fastfood: "hotdogs, All", 
                            Italian: "italian, All", 
                            Indian: "indpak, All", 
                            Spanish: "spanish, All", 
                            Vegetarian: "vegetarian, All", 
                            Vegan: "vegan, All",
                            Mediterranean: "mediterranean, All"}

const choiceSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  api_name: String,
  output_name: String
}, {
  timestamps: true
});

function create(){
  categories.forEach(function(category) {
    if ( category.parents[0] === "restaurants" || category.parents[0] === "food"){
      db.collection('choice').insertOne({
        api_name: category.alias,
        output_name: category.title
      });
    }
   })
}

module.exports = mongoose.model('Choice', choiceSchema);