const User = require("../models/user");
const mongoose = require('mongoose');


module.exports = {
  update
}


function update(req, res) {
  User.findOne ({'user.location': req.body.location}, function (err, user){
    user.location = req.body.location;
    user.save(function(err) {
      res.redirect('/restaurant-choices');
    })
  })
}