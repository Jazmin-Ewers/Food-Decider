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
    create,
    bestChoices
}

let searchRequest = {
  location: "nashville, tn",
  categories: 'Restaurants',
  limit: 5,
};

async function index(req, res) {
  res.render("restaurant-choices/index", { title: "Choose a Restuarant"});
  }

function create(req, res) {
  const saved_restaurant = new Saved_restaurants(req.body);
  console.log(req.body);
  // Assign the logged in user's id
  saved_restaurant.user = req.user._id;
  saved_restaurant.save(function(err) {
    if (err) return render("/saved-resturants");
    res.redirect("/saved-resturants");
  });
}

function bestChoices(req, res) {
  // Based on the top crusine choice seach Restaurants with that cruisine  
  searchRequest.location = req.body.location;
  searchRequest.categories = req.body.food_choice_1;
  client.search(searchRequest).then(response => {
    const businesses = response.jsonBody.businesses;
    res.render("restaurant-choices/new", { title: "Choose a Restuarant", businesses });
});
}
  // User.findOneAndUpdate({_id: req.user._id},
  //   // update object with updated properties
  //   req.body,
  //   // options object with new: true to make sure updated doc is returned
  //   {new: true}
  // );
  // User.findById(req.user._id, function(err, user) {
  //   // Push friend choices into User arrays
  //   // add the user properties to the review being created (req.body)
  //   req.body.user = req.user._id;
  //   req.body.friend_name = req.user.friend_name
  //   req.body.friend_food_choice_1 = req.user.friend_food_choice_1
  //   // Save any changes made to the User doc
  //   user.save(function(err) {
  //     console.log(user);
  //     res.redirect('/restaurant-choices');
  //   });
  // });

     





