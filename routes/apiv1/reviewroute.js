const express = require('express');
const router = express.Router();

const Review = require('../../models/review');
const Comment = require('../../models/comment');
const NullSector = require("../../util/nullsector");
const {formatReviews} = require("../../util/format");
const {formatReview} = require("../../util/format");

//creation of a new review
router.post('', (req, res, next) => {
    const body = req.body;

    const review = new Review({
        user: res.get('id'),
        title: body.title,
        content: body.content,
        appId: body.appId.toString()
    });

    review.save().then(() => {
        res.status(200).json('Review created!');
    }).catch((error) => {
        next(error);
    });
});

router.post('/:id/comment', (req, res, next) => {
    NullSector.hasReview({_id: req.params.id}, (error, bool, review) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            const comment = new Comment({
                review: review._id,
                user: res.get('id'),
                content: req.body.content
            });

            comment.save().then(() => {
                res.status(200).json('Comment created!');
            }).catch((error) => {
                next(error);
            })
        }
    });
});

//gets all reviews
router.get('/:appid', (req, res, next) => {
    Review.find({appId: req.params.appid}).then((reviews) => {
        res.status(200).json(formatReviews(reviews, res.get('id')));
    }).catch((error) => {
        next(error);
    });
});


//update a review
router.put('/:id', (req, res, next) => {
    NullSector.hasReview({_id: req.params.id, user: res.get('id')}, (error, bool, review) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            review.update({
                title: req.body.title,
                content: req.body.content,
                edited: true
            }).then(() => {
                res.status(200).json('Review updated!');
            }).catch((error) => {
                next(error);
            });
        }
    });
});

router.put('/:id/upvote', (req, res, next) => {
    NullSector.hasReview({_id: req.params.id}, (error, bool, review) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            let upVotes = review.votes.upVotes;
            let downVotes = review.votes.downVotes;

            if (!upVotes.includes(res.get('id'))) {
                upVotes.push(res.get('id'));
                downVotes.remove(res.get('id'));
            }

            review.update({
                votes: {
                    upVotes: upVotes,
                    downVotes: downVotes
                }
            }).then(() => {
                res.status(200).json('Upvoted review!');
            }).catch((error) => {
                next(error);
            });
        }
    });
});

router.put('/:id/downvote', (req, res, next) => {
    NullSector.hasReview({_id: req.params.id}, (error, bool, review) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            let upVotes = review.votes.upVotes;
            let downVotes = review.votes.downVotes;

            if (!downVotes.includes(res.get('id'))) {
                downVotes.push(res.get('id'));
                upVotes.remove(res.get('id'));
            }

            review.update({
                votes: {
                    upVotes: upVotes,
                    downVotes: downVotes
                }
            }).then(() => {
                res.status(200).json('Downvoted review!');
            }).catch((error) => {
                next(error);
            });
        }
    });
});

//delete a review
router.delete('/:id', (req, res, next) => {
    NullSector.hasReview({_id: req.params.id, user: res.get('id')}, (error, bool, review) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            Promise.all([review.remove(), Comment.deleteMany({review: req.params.id})])
                .then(() => {
                    res.status(200).json('Review deleted!');
                }).catch((error) => {
                next(error);
            })
        }
    });
});

module.exports = router;
