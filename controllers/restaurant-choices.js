const User = require("../models/user");
const Saved_restaurants = require("../models/saved_restaurants");
const yelp = require('yelp-fusion');

const apiKey = 'brkDCqolLNdPOB408WxYkXFPVPUCPlA2xFyDuHP3e1tXbAE6szmzIgRPl2N1UaAiivB08futcBFS8Fcg-wefO_cn2XvBbgxQV1yRtcVEBxyycMwMNxeSaQXCR6a7YXYx';

const client = yelp.client(apiKey);

module.exports = {
    index,
    update
}

let searchRequest = {
  location: "nashville, tn",
  categories: 'Restaurants',
  limit: 5,
};

let restaurantCategories = {Mexican: "mexican, All", American: "newamerican, [SE, NO, GB, IE, US, DK]", Asian: "chinese, All", Fastfood: "hotdogs, All" }

async function index(req, res) {
    const users = await User.find({});
    res.render("restaurant-choices/index", { title: "Choose a Restuarant", users});
  }

// Update the User's and User's friend food choices and location
function update(req, res) {
  // Create friend choices
  req.user.friend.push(req.body.friend_name);
  req.user.friend.push(req.body.friend_food_choice_1);
  // Update user choices 
  req.user.food_choice_1 = req.body.food_choice_1
  req.user.location = req.body.location
  // Based on the top crusine choice seach Restaurants with that cruisine  
  searchRequest.location = req.body.location;
  for (let key in restaurantCategories){
    if (req.body.food_choice_1 === key) {
      searchRequest.categories = restaurantCategories[key];
    }
  }
  client.search(searchRequest).then(response => {
    const businesses = response.jsonBody.businesses;
    req.user.save(function(err) {
    res.render("restaurant-choices/new", { title: "Choose a Restuarant", businesses });
  });
});
}


