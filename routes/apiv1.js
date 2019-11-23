const NullSector = require("../util/nullsector");
const Comment = require('../models/comment');

const jwt = require('../helpers/jwt');
const express = require('express');
const assert = require('assert');

const router = express.Router();

const commentRoute = require('./apiv1/commentroute');
const reviewRoute = require('./apiv1/reviewroute');
const userRoute = require('./apiv1/userroute');

/*   Validation JWT-Token   */
router.get('*', validateToken);

router.post('*', validateToken);

router.put('*', validateToken);

router.delete('*', validateToken);

function validateToken(req, res, next) {
    const token = req.query.token || "";

    jwt.decodeToken(token, (error, payload) => {
        if (error) {
            res.status(401).json(error);
        } else {
            res.set('id', payload.sub);
            next();
        }
    });
}


//addition of routes
router.use('/reviews', reviewRoute);
router.use('/comments', commentRoute);
router.use('/users', userRoute);

router.get('/review/:id', (req, res, next) => {
    NullSector.hasReview({_id: req.params.id}, (error, bool, review) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            Comment.find({review: review._id}).then((comments) => {
                res.status(200).json({
                    review: review,
                    comments: comments
                });
            }).catch((error) => {
                next(error);
            });
        }
    });
});

module.exports = router;


