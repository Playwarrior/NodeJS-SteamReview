const express = require('express');

const router = express.Router();

const userRoute = require('./apiv2/userroute');

router.use('/users', userRoute);

module.exports = router;
