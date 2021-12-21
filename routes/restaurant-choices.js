const express = require('express');
const router = express.Router();
const restaurantchoicesCtrl = require('../controllers/restaurant-choices');

// GET "/restaurant-choices" - Index Route
router.get('/', restaurantchoicesCtrl.index);

// POST	/restaurant-choices	restaurantchoices.bestChoices 
router.post('/', restaurantchoicesCtrl.bestChoices);

// POST	/restaurant-choices/new	restaurantchoices.create
router.post('/new', restaurantchoicesCtrl.create);

module.exports = router;