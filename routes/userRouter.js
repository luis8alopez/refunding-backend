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

userRouter.route('/save')
    .post((req, res, next) => {
        console.log("al menos entro");
        Users.findOne({ email: req.body.email })
            .then((result) => {
                if (result) {
                    res.status(200).json({ message: "Email already registered", flag: 0 });
                }
                else {
                    Users.create({
                        firstName: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                        photo: req.body.photo,
                        id: req.body.id
                    }).then((user) => {
                        if (!user) {
                            console.log("Not able to save");
                            res.status(500).json({ message: "Saved", flag: 1 });
                        }
                        else {
                            res.status(200).json({ message: "Saved", flag: 1 });
                        }
                    })
                }
            })
    })

userRouter.route('/saveHistory')
    .post((req, res, next) => {
        Users.findOne({ email: req.body.email })
            .then((user) => {
                if (user) {
                    user.history.push({precio: req.body.precio});
                    console.log("en user hay: ",user);
                    console.log("En user quedó user");
                    //Error aquí.
                    user.save() 
                        .then((user) => {
                            res.status(200).send({
                                message: "User succesfully updated",
                                user: user
                            })
                        }).catch((err) => { console.log(err) })
                }
                else {
                    res.status(404).json({ message: "There is no user registrated" });
                }

            })
            .catch((err) => { console.log(err) })

    });


module.exports = userRouter;