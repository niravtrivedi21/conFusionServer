const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const cors = require('./cors');

const Leaders = require('../models/leaders');

const leadersRouter = express.Router();

leadersRouter.use(bodyParser.json());




leadersRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
})
    .get(cors.cors, (req, res, next) => {
        // res.end('Will send all the leaders to you!');
        Leaders.find({})
            .then((leaders) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leaders);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        // res.end('Will add the leaders: ' + req.body.name + ' with details: ' + req.body.description);
            Leaders.create(req.body)
                .then((leader) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);
                }, (err) => next(err))
                .catch((err) => next(err));
    })
    .put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
            res.statusCode = 403;
            res.end('PUT opration not supported on /leaders');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        // res.end('Deleting all the leaders!');
            Leaders.remove()
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => next(err));
    })

leadersRouter.route('/:leaderId')
.options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
})
    .get(cors.cors, (req, res, next) => {
        // res.end('Will send details of the leader: ' + req.params.leaderId + ' to you!');
        Leaders.findById(req.params.leaderId)
            .then((leader) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(leader);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .post(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
            res.statusCode = 403;
            res.end('POST operation not supported on /leaders/' + req.params.leaderId);

    })

    .put(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        // res.write('Updating the leader: ' + req.params.leaderId + '\n');
        // res.end('Will update the leader: ' + req.body.name +
        //     ' with details: ' + req.body.description);
            Leaders.findByIdAndUpdate(req.params.leaderId, {
                $set: req.body
            }, { new: true })
                .then((leader) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(leader);
                }, (err) => next(err))
                .catch((err) => next(err));
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser,authenticate.verifyAdmin, (req, res, next) => {
        // res.end('Deleting leader: ' + req.params.leaderId);
            Leaders.findByIdAndRemove(req.params.dishId)
                .then((resp) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }, (err) => next(err))
                .catch((err) => next(err));
    });


module.exports = leadersRouter;