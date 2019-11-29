const express = require('express');
const router = express.Router();
const NullSector = require('../../util/nullsector');
const {formatComments} = require("../../util/format");

router.get('/:reviewId', (req, res, next) => {
    Comment.find({review: req.params.reviewId}).then((comments) => {
        res.status(200).json(formatComments(comments));
    }).catch((error) => {
        next(error);
    })
});

router.put('/:id', (req, res, next) => {
    NullSector.hasComment({_id: req.params.id, user: res.get('id')}, (error, bool, comment) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            comment.update({
                content: req.params.content,
                edited: true
            }).then(() => {
                res.status(200).json('Comment updated!');
            }).catch((error) => {
                next(error);
            });
        }
    });
});

router.delete('/:id', (req, res, next) => {
    NullSector.hasComment({_id: req.params.id, user: res.get('id')}, (error, bool, comment) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            comment.remove().then(() => {
                res.status(200).json('comment deleted!');
            });
        }
    });
});

router.put('/:id/upvote', (req, res, next) => {
    NullSector.hasComment({_id: req.params.id}, (error, bool, comment) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            let upVotes = comment.votes.upVotes;
            let downVotes = comment.votes.downVotes;

            if (!upVotes.includes(res.get('id'))) {
                upVotes.push(res.get('id'));
                downVotes.remove(res.get('id'));
            }

            comment.update({
                votes: {
                    upVotes: upVotes,
                    downVotes: downVotes
                }
            }).then(() => {
                res.status(200).json('Upvoted comment!');
            }).catch((error) => {
                next(error);
            });
        }
    });
});

router.put('/:id/downvote', (req, res, next) => {
    NullSector.hasComment({_id: req.params.id}, (error, bool, comment) => {
        if (error)
            next(error);

        else if (!bool)
            res.status(204);

        else {
            let upVotes = comment.votes.upVotes;
            let downVotes = comment.votes.downVotes;

            if (!downVotes.includes(res.get('id'))) {
                downVotes.push(res.get('id'));
                upVotes.remove(res.get('id'));
            }

            comment.update({
                votes: {
                    upVotes: upVotes,
                    downVotes: downVotes
                }
            }).then(() => {
                res.status(200).json('Downvoted comment!');
            }).catch((error) => {
                next(error);
            });
        }
    });
});

module.exports = router;
