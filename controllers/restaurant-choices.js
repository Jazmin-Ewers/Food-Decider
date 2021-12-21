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
  limit: 5,
};

async function index(req, res) {
  res.render("restaurant-choices/index", { title: "Choose a Restuarant"});
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