const User = require("../models/user");
const Saved_restaurants = require("../models/saved_restaurants");
const Choice = require("../models/choice");

module.exports = {
  index,
  create,
  delete: deleteSavedrestaurant
}

  async function index(req, res) {
    const saved_restaurants = await Saved_restaurants.find({});
    res.render("saved-restaurants/index", { title: "Saved restaurants", saved_restaurants });
  }

  function create(req, res) {
    const saved_restaurant = new Saved_restaurants(req.body);
    // Assign the logged in user's id
    saved_restaurant.userRestaurants = req.user._id;
    console.log(req.user);
    saved_restaurant.save(function(err) {
      if (err) return render("/restaurant-choices");
      res.redirect('/saved-restaurants');
    });
  }

  function deleteSavedrestaurant(req, res) {
    Saved_restaurants.findOneAndDelete(
      // Ensue that the book was created by the logged in user
      {_id: req.params.id, userRestaurants: req.user._id}, function(err) {
        // Deleted book, so must redirect to index
        res.redirect('/saved-restaurants');
      }
    );
  }