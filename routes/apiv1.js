const jwt = require('../helpers/jwt');
const express = require('express');
const assert = require('assert');

const router = express.Router();

const commentRoute = require('./apiv1/commentroute');
const reviewRoute = require('./apiv1/reviewroute');
const userRoute = require('./apiv1/userroute');

/*   Validation JWT-Token   */
router.all('*', (req, res, next) => {

    assert(typeof req.headers["token"] == "string", "No valid token!");

    const token = req.header("token") || "";

    jwt.decodeToken(token, (error, payload) => {
        if (error) {
            res.status(401).json(error);
        } else {
            res.set('email', payload.sub);
            next();
        }

        console.log(payload.sub);
    });
});

//addition of routes
router.use('/reviews', reviewRoute);
router.use('/comments', commentRoute);
router.use('users', userRoute);

module.exports = router;


