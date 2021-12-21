const User = require("../models/user");
const Saved_restaurants = require("../models/saved_restaurants");
const Choice = require("../models/choice");

module.exports = {
  index,
  create
}

  async function index(req, res) {
    const saved_restaurants = await Saved_restaurants.find({});
    res.render("saved-restaurants/index", { title: "Saved restaurants", saved_restaurants });
  }

  function create(req, res) {
    const saved_restaurant = new Saved_restaurants(req.body);
    // Assign the logged in user's id
    // saved_restaurant.user = req.user._id;
    saved_restaurant.save(function(err) {
      if (err) return render("/restaurant-choices");
      res.redirect("/restaurant-choices");
    });
  }