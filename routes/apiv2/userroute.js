const express = require('express');
const request = require('request');

const NullSector = require('../../util/nullsector');

const router = express.Router();

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

                res.status(200).json(b.response.players[0]);
            });
        }
    });
});

module.exports = router;
