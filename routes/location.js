const express = require('express');
const router = express.Router();
const locationCtrl = require('../controllers/location');


router.get("/location", function (req, res) {
    res.render("location");
  });
  
router.post("/location", locationCtrl.update);


module.exports = router;