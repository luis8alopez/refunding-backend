const Users = require('../models/users');
const express = require('express');
const userRouter = express.Router();
const bodyparser = require('body-parser')

userRouter.use(bodyparser.json());

userRouter.route('/')
    .get((req, res, next) => {
        Users.find({})
            .then((users) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(users);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post((req, res, next) => {
        Users.create(req.body)
            .then((user) => {
                console.log('User Created', user);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('Put operation not supported on /users');
    })

    .delete((req, res, next) => {
        res.statusCode = 403;
        res.end('Delete operation not supported on /users');
    });

module.exports = userRouter;