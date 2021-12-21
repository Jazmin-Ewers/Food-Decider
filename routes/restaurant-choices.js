const express = require('express');
const router = express.Router();
const restaurantchoicesCtrl = require('../controllers/restaurant-choices');

// GET "/restaurant-choices" - Index Route
router.get('/', restaurantchoicesCtrl.index);

// POST	/restaurant-choices	On the restaurant choices page submit your choices to get the best list of restaurant choices for you 
router.post('/', restaurantchoicesCtrl.bestChoices);

module.exports = router;