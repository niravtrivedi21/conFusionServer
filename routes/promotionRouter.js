const express = require('express');
const bodyParser = require('body-parser');

const Promotions = require('../models/promotions');

const promotionsRouter = express.Router();

promotionsRouter.use(bodyParser.json());



promotionsRouter.route('/')
    .get((req, res, next) => {
        Promotions.find({})
            .then((promos) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(promos);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
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
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT opration not supported on /promotions');
    })
    .delete((req, res, next) => {
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
    .get((req, res, next) => {
        // res.end('Will send details of the promotion: ' + req.params.promoId + ' to you!');
        Promotions.findById(req.params.promoId)
        .then((promo) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(promo);
        }, (err) => next(err))
        .catch((err) => next(err));
    })

    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /promotions/' + req.params.promoId);
    })

    .put((req, res, next) => {
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

    .delete((req, res, next) => {
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