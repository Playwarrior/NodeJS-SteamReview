const Review = require('../models/review');
const Comment = require('../models/comment');

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

module.exports = {
    hasReview,
    hasComment
};
