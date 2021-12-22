const express = require("express");
const router = express.Router();
const passport = require('passport');


router.get("/", function (req, res, next) {
  res.render("home");
});

router.get("/location", function (req, res) {
  res.render("location");
});

router.post("/location", function (req, res) {
  res.render("location");
});

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email']}
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: "/location",
    failureRedirect: "/restaurant-choices"
  }
));

// OAuth logout route
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect("/restaurant-choices");
});

module.exports = router;
