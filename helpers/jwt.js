const moment = require("moment");
const jwt = require("jwt-simple");

const connection = require('../connection');

function encodeToken(username) {
    const payload = {
        exp: moment()
            .add(1, "days")
            .unix(),
        iat: moment().unix(),
        sub: username
    };

    return jwt.encode(payload, process.env.KEY || connection.key);
}

function decodeToken(token, cb) {
    try {
        const payload = jwt.decode(token,process.env.KEY || connection.key);
        if (moment().unix() > payload.exp) {
            cb(new Error("token expired!"));
        } else {
            cb(null, payload);
        }
    } catch (err) {
        cb(err);
    }
}

module.exports = {
    encodeToken,
    decodeToken
};
