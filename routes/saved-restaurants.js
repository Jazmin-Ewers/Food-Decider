const express = require('express');
const router = express.Router();
const savedrestaurantsCtrl = require('../controllers/saved-restaurants');

// GET "/saved-resturants" - Index Route
router.get('/saved-restaurants', savedrestaurantsCtrl.index);

// POST "/saved-resturants" - Index Route
router.post('/saved-restaurants', savedrestaurantsCtrl.create);


module.exports = router;