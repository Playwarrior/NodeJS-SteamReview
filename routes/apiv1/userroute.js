const express = require('express');
const router = express.Router();
const request = require('request');

const Comment = require('../../models/comment');
const Review = require('../../models/review');
const User = require('../../models/user');
const assert = require("assert");

router.get('/reviews', (req, res, next) => {
    User.findOne({_id: res.get('id')}, {_id: 1}).then((user) => {
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
    User.findOne({_id: res.get('id')}, {_id: 1}).then((user) => {
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

router.get('/games', (req, res, next) => {
    User.findOne({_id: res.get('id')}).then(user => {
        request.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=D640AA92C21657F4319FE96D5A269F4D&format=json&steamid=${user.steam}`, {}, (error, response, body) => {
            if (error)
                next(error);

            else {
                res.status(200).json(body);
            }
        });
    });
});

module.exports = router;
