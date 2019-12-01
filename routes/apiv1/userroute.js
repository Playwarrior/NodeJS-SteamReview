const express = require('express');
const router = express.Router();
const request = require('request');

const Comment = require('../../models/comment');
const Review = require('../../models/review');
const User = require('../../models/user');

const NullSector = require("../../util/nullsector");
const {formatReviews} = require("../../util/format");

router.get('/reviews', (req, res, next) => {
    NullSector.hasUser({_id: id}, (error, bool, user) => {
        if(error)
            next(error);

        else if(bool)
            res.status(204);

        else {
            Review.find({user: id}).then((reviews) => {
                res.status(200).json(formatReviews(reviews, res.get('id')));
            }).catch((error) => {
                next(error);
            })
        }
    });
});

router.get('/:id/reviews', (req, res, next) => {
    const id = req.params.id;

    NullSector.hasUser({_id: id}, (error, bool, user) => {
        if(error)
            next(error);

        else if(bool)
            res.status(204);

        else {
            Review.find({user: id}).then((reviews) => {
                res.status(200).json(formatReviews(reviews, res.get('id')));
            }).catch((error) => {
                next(error);
            })
        }
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
    const name = req.query.name;

    User.findOne({_id: res.get('id')}).then(user => {
        request.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=895B4194E1AD13021E19E236A6D8CC7E&include_appinfo=true&include_played_free_games=true&format=json&steamid=${user.steam}`, {}, (error, response, body) => {
            if (error)
                next(error);

            else {
                let games = JSON.parse(body).response.games;

                if (name && games)
                    games = games.filter(game => {
                        return game.name.toLowerCase().startsWith(name.toLowerCase());
                    });

                res.status(200).json(games);
            }
        });

    });
});

router.get('/games/:id', (req, res, next) => {
    User.findOne({_id: res.get('id')}).then(user => {
        request.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=895B4194E1AD13021E19E236A6D8CC7E&include_appinfo=true&include_played_free_games=true&format=json&steamid=${user.steam}`, {}, (error, response, body) => {
            if (error)
                next(error);

            else {
                const b = JSON.parse(body);

                res.status(200);

                if (b.response.games)
                    res.json(b.response.games.filter(game => game.appid == req.params.id)[0]);

                else
                    res.json({});
            }
        });
    });
});

module.exports = router;
