const express = require('express');

const router = express.Router();

const userRoute = require('./apiv2/userroute');
const reviewRoute = require('./apiv2/reviewroute');
const commentRoute = require('./apiv2/commentroute');

router.use('/users', userRoute);
router.use('/reviews', reviewRoute);
router.use('/comments', commentRoute);

module.exports = router;
