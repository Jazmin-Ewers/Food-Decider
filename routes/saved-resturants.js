const express = require('express');
const router = express.Router();
const savedresturantsCtrl = require('../controllers/saved-resturants');

// GET "/saved-resturants" - Index Route
router.get('/', savedresturantsCtrl.index);

module.exports = router;