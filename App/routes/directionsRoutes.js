const express = require('express');
const router = express.Router();
const Directions = require('../controllers/directionsController');

router.get('/getKm', Directions.getAxios);

module.exports = router;