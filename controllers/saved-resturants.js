const User = require("../models/user");
const Saved_restaurants = require("../models/saved_restaurants");
const Choice = require("../models/choice");

module.exports = {
  index
}

  async function index(req, res) {
    const saved_restaurants = await Saved_restaurants.find({});
    res.render("/saved-resturants", { title: "Saved Restuarants", saved_restaurants });
  }