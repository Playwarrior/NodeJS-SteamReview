const express = require('express');
const request = require('request');

const NullSector = require('../../util/nullsector');
const Review = require('../../models/review');
const {formatReviews} = require("../../util/format");
const User = require('../../models/user');

const router = express.Router();

router.get('', (req, res, next) => {
    const limit = req.query.limit || 16;

    User.find({}, {id: 1, steam: 1}).limit(limit).then((users) => {
        res.status(200).json(users);
    }).catch((error) => {
        next(error);
    })
});

router.get('/profile/:id', (req, res, next) => {
    const id = req.params.id;

    NullSector.hasUser({_id: id}, (error, bool, user) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            request(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=895B4194E1AD13021E19E236A6D8CC7E&steamids=${user.steam}`, {}, (error, response, body) => {
                if (error)
                    next(error);

                let b = JSON.parse(body);

                let player = b.response.players[0];
                player.id = id;

                res.status(200).json(player);
            });
        }
    });
});

router.get('/:id/reviews', (req, res, next) => {
    const id = req.params.id;

    NullSector.hasUser(id, (error, bool, user) => {
       if(error)
           next(error);

       else if(!bool)
           res.status(204);

       else {
           Review.find({user: id}).then((reviews) => {
               res.status(200).json(formatReviews(reviews));
           }).catch((error) => {
               next(error);
           })
       }
    });
});

router.get('/:id/games/:appid', (req, res, next) => {
    const name = req.query.name;

    User.findOne({_id: req.params.id}).then(user => {
        request.get(`https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=895B4194E1AD13021E19E236A6D8CC7E&include_appinfo=true&include_played_free_games=true&format=json&steamid=${user.steam}`, {}, (error, response, body) => {
            if (error)
                next(error);

            else {
                const b = JSON.parse(body);

                res.status(200);

                if (b.response.games)
                    res.json(b.response.games.filter(game => game.appid == req.params.appid)[0]);

                else
                    res.json({});
            }
        });
    });
});

module.exports = router;
