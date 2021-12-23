const User = require("../models/user");
const Saved_restaurants = require("../models/saved_restaurants");
const Choice = require("../models/choice");
const yelp = require('yelp-fusion');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = mongoose.connection;

const apiKey = 'brkDCqolLNdPOB408WxYkXFPVPUCPlA2xFyDuHP3e1tXbAE6szmzIgRPl2N1UaAiivB08futcBFS8Fcg-wefO_cn2XvBbgxQV1yRtcVEBxyycMwMNxeSaQXCR6a7YXYx';

const client = yelp.client(apiKey);

module.exports = {
    index,
    bestChoices
}

let searchRequest = {
  location: "nashville, tn",
  categories: 'Restaurants',
  limit: 10,
};

async function index(req, res) {
  res.render("restaurant-choices/index", { title: "Choose a Restuarant"});
  }

function bestChoices(req, res) {
  // Find the logged in User's location.
  User.findOne({'user._id': req.user.id}, function(err, user) { 
  searchRequest.location = req.user.location;
  // For each Restaurant choice Give points according to ranking. #1 : 5 points #2 : 3 points #3 : 1 points
  let foodChoicePoints = {};
  Object.entries(req.body).forEach(([key, value]) => {
    if (key === 'food_choice_1'){
      for (let i = 0; i < value.length; i++) {
          if (`${value[i]}` in foodChoicePoints){
            foodChoicePoints[value[i]] += 5
        } else {
          foodChoicePoints[value[i]] = 5
        }
      }
    } else if (key === 'food_choice_2') {
        for (let i = 0; i < value.length; i++) {
            if (`${value[i]}` in foodChoicePoints){
              foodChoicePoints[value[i]] += 3
          } else {
            foodChoicePoints[value[i]] = 3
          }
        }
    } else if (key === 'food_choice_3') {
        for (let i = 0; i < value.length; i++) {
          if (`${value[i]}` in foodChoicePoints){
            foodChoicePoints[value[i]] += 1
        } else {
          foodChoicePoints[value[i]] = 1
        }
      }
    }
});

// Find Max value from foodChoicePoints
let arr = Object.values(foodChoicePoints);
let max = Math.max(...arr);

// Find first key that corresponds with the Max value
function getKeyByValue(object, value) {
  return Object.keys(object).find(key => 
          object[key] === value);
}
let bestChoice = getKeyByValue(foodChoicePoints, max);
searchRequest.categories = bestChoice;
// Based on the top crusine choices seach Restaurants with that cruisine 
  client.search(searchRequest).then(response => {
    const businesses = response.jsonBody.businesses;
  res.render("restaurant-choices/new", { title: "Choose a Restuarant", businesses });
});
})
}
