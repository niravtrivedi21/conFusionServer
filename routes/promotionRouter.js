const express = require('express');
const bodyParser = require('body-parser');

const authenticate = require('../authenticate');

const Promotions = require('../models/promotions');

const cors = require('./cors');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());



promotionsRouter.route('/')
.options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
})
    .get(cors.cors, (req, res, next) => {
        Promotions.find({})
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
        // res.end('Will add the promotions: ' + req.body.name + ' with details: ' + req.body.description);

        Promotions.create(req.body)
            .then((promo) => {
                console.log('Promo Created ', promo);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));

    })
    .put(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('PUT opration not supported on /promotions');
    })
    .delete(authenticate.verifyUser,(req, res, next) => {
        // res.end('Deleting all the promotions!');
        Promotions.remove()
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

promotionsRouter.route('/:promoId')
.options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
})
    .get(cors.cors, (req, res, next) => {
        // res.end('Will send details of the promotion: ' + req.params.promoId + ' to you!');
        Promotions.findById(req.params.promoId)
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, (err) => next(err))
        .catch((err) => next(err));
    })

    .post(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })

    .put(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
        // res.write('Updating the promotion: ' + req.params.promoId + '\n');
        // res.end('Will update the promotion: ' + req.body.name +
        //     ' with details: ' + req.body.description);
        Promotions.findByIdAndUpdate(req.params.promoId, {
            $set: req.body
        }, { new: true })
            .then((promo) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promo);
            }, (err) => next(err))
            .catch((err) => next(err));
    })

    .delete(cors.corsWithOptions, authenticate.verifyUser,(req, res, next) => {
        // res.end('Deleting promotion: ' + req.params.promoId);
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(resp);
        }, (err) => next(err))
        .catch((err) => next(err));
    });


module.exports = promotionsRouter;