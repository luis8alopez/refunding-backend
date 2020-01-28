const express = require('express');
const router = express.Router();
const Directions = require('../controllers/directionsController');

router.get('/getKm', Directions.getAxios);
router.get('/getPrice',Directions.getPrice);

module.exports = router;