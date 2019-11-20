const express = require('express');
const router = express.Router();

const Comment = require('../../models/comment');
const Review = require('../../models/review');
const User = require('../../models/user');

router.get('/reviews', (req, res, next) => {
    User.findOne({email: res.get('email')}, {_id: 1}).then((user) => {
        if (user === null || user === undefined)
            next(new Error('Cannot find user!'));

        else
            return Review.find({user: user._id});
    }).then((reviews) => {
        res.status(200).json(reviews);
    }).catch((error) => {
        next(error);
    });
});

router.get('/comments', (req, res, next) => {
    User.findOne({email: res.get('email')}, {_id: 1}).then((user) => {
        if (user === null || user === undefined)
            next(new Error('Cannot find user!'));

        else
            return Comment.find({user: user._id});
    }).then((comments) => {
        res.status(200).json(comments);
    }).catch((error) => {
        next(error);
    });
});

module.exports = router;
