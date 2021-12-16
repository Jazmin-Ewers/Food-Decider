const User = require("../models/user");
const Saved_restaurants = require("../models/saved_restaurants");


module.exports = {
    index
}

async function index(req, res) {
    const users = await User.find({});
    res.render("restaurant-choices/index", { title: "Choose a Restuarant", users });
  }
