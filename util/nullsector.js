const Review = require('../models/review');
const Comment = require('../models/comment');
const User = require('../models/user');


function hasReview(searchCriteria, cb) {
    Review.findOne(searchCriteria).then((review) => {
        cb(null, review !== null, review);
    }).catch((error) => {
        cb(error, false, null);
    });
}

function hasComment(searchCriteria, cb) {
    Comment.findOne(searchCriteria).then((comment) => {
        cb(null, comment !== null, comment);
    }).catch((error) => {
        cb(error, false, null);
    });
}

function hasUser(searchCriteria, cb) {
    User.findById(searchCriteria).then((user) => {
        cb(null, user !== null, user);
    }).catch((error) => {
        cb(error, false, null);
    });
}

module.exports = {
    hasReview,
    hasComment,
    hasUser
};
