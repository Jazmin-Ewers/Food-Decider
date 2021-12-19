const express = require('express');
const router = express.Router();
const restaurantchoicesCtrl = require('../controllers/restaurant-choices');

// GET "/restaurant-choices" - Index Route
router.get('/', restaurantchoicesCtrl.index);

// POST	"/restaurant-choices" - Update Route 
router.post('/', restaurantchoicesCtrl.update);

module.exports = router;