const express = require('express');
const router = express.Router();
const savedrestaurantsCtrl = require('../controllers/saved-restaurants');
const isLoggedIn = require('../config/auth');

// GET "/saved-resturants" - Index Route
router.get('/saved-restaurants', savedrestaurantsCtrl.index);

// POST "/saved-resturants" - Index Route
router.post('/saved-restaurants', isLoggedIn, savedrestaurantsCtrl.create);

// DELETE '/saved-restaurants/:id	booksCtrl.delete	Delete a book (restrict to user who submitted the book)
router.delete('/saved-restaurants/:id', isLoggedIn, savedrestaurantsCtrl.delete);

module.exports = router;