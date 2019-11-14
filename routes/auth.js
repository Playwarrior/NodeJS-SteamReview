const jwt = require('../helpers/jwt');
const encrypt = require('../helpers/encrypt.js');

const User = require('../models/user');
const $User = require('../validators/uservalidator');

const assert = require('assert');

const express = require('express');
const router = express.Router();

//login route
router.post('/login', (req, res, next) => {
    const body = req.body || {};

    try {
        assert(req.body.email !== undefined, 'Email not found!');
        assert(req.body.password !== undefined, 'Password not found!');

        User.findOne({email: body.email}).then((user) => {
            if (user === null)
                next(new Error('Cannot find user!'));

            else if (!encrypt.checkPassword(body.password, user.password))
                next(new Error('Incorrect password!'));

            else {
                const token = jwt.encodeToken(user.email);

                res.status(200).json({
                    token: token,
                    steam: user.steam
                });
            }
        }).catch((error) => {
            next(error); //TODO RETURN A GOOD ERROR CODE!
        });
    } catch (ex) {
        next(ex);
    }
});

//register route
router.post('/register', (req, res, next) => {
    const body = req.body;

    try {
        assert(body.email !== undefined && $User.validateEmail(body.email), "Email not found");
        assert(body.password !== undefined && $User.validatePassword(body.password), "Password not found");
        assert(body.steam !== undefined && $User.validateSteamId(body.steam), "SteamId not found");

        let user = new User({email: body.email, password: encrypt.encryptPassword(body.password), steam: body.steam});

        user.save().then(() => {
            res.status(200).json("created user!");
        }).catch((error) => {
            next(error); //TODO: RETURN A GOOD ERROR CODE!
        });
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
