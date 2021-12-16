const express = require('express');
const router = express.Router();
const restaurantchoicesCtrl = require('../controllers/restaurant-choices');

// GET "/restaurant-choices" - Index Route
router.get('/', restaurantchoicesCtrl.index);

module.exports = router;