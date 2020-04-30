const express = require('express');
const directionUtil = require('../utils/directionUtils');

const directionRouter = express.Router();

directionRouter.route('/getKm')
    .get(async(req, res, next) => {
        origin = req.query.origin;
        destination = req.query.destination;
        direction = await directionUtil.getKm(origin, destination);
        console.log("directions",direction);
        if (!direction) {
            res.statusCode = 404
            err = 'Direction not found';
            next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(direction);
    });
directionRouter.route('/getPrice')
    .get((req, res, next) => {
        const price = directionUtil.getPrice(req.query.kilometer);
        if (!price) {
            res.statusCode = 404
            err = 'Price not found';
            next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(price);
    });

directionRouter.route('/getRefund')
    .get((req, res, next) => {
        const refund = directionUtil.getRefund(req.query.price);
        if (!refund) {
            res.statusCode = 404
            err = 'Refund not found';
            next(err);
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(refund);
    });

module.exports = directionRouter;



