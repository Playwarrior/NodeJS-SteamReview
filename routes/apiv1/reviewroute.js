const express = require('express');
const router = express.Router();
const assert = require('assert');

const User = require("../../models/user");
const Review = require('../../models/review');
const Comment = require('../../models/comment');

//TODO: WHEN REWRITING A REVIEW ONLY LET THE AUTHOR EDIT THE REVIEW/COMMENT

//creation of a new review
router.post('', (req, res, next) => {
    const body = req.body;

    try {
        assert(typeof body.content == "string", "Invalid content!");
        assert(typeof body.title == "string", "Invalid title!");
        assert(typeof body.appId == "number", "Invalid app-id");

        User.findOne({email: res.get('email')}, {_id: 1}).then((user) => {
            return new Review({
                user: user._id,
                postDate: Date.now(),
                content: body.content,
                appId: body.appId,
                edited: false,
                title: body.title,
                votes: {
                    upVotes: [],
                    downVotes: []
                }
            });
        }).then((review) => review.save()).then(() => {
            res.status(200).json('Created Review');
        }).catch((error) => {
            next(error);
        });
    } catch (ex) {
        next(ex);
    }
});

//gets all reviews
router.get('', (req, res, next) => {
    Review.find().then((reviews) => {
        res.status(200).json(reviews);
    }).catch((error) => {
        next(error);
    });
});

//gets review with certain id
router.get('/:id', (req, res, next) => {
    try {
        assert(req.params.id.length === 19, 'Invalid Id');

        Review.findOne({_id: req.params.id}).then((review) => {
            if (review === null || review === undefined)
                next(new Error('Invalid Id'));

            else
                res.status(200).json(review);
        }).catch((error) => {
            next(error);
        })
    } catch (ex) {
        next(ex);
    }
});

//update a review
router.put('/:id', (req, res, next) => {
    const body = req.body;

    try {
        assert(req.params.id.length === 19, 'Invalid Id');
        assert(typeof body.title == "string", "Invalid Title");
        assert(typeof body.content == "string", "Invalid Content");

        Review.findByIdAndUpdate(req.params.id, {
            edited: true,
            title: body.title,
            content: body.content
        }).then(() => {
            res.status(200).json('Updated Review : ' + req.params.id);
        }).catch((error) => {
            next(error);
        });
    } catch (ex) {
        next(ex);
    }
});

//delete a review
router.delete('/:id', (req, res, next) => {
    try {
        assert(req.params.id.length === 19, 'Invalid Id');

        Review.findByIdAndRemove(req.params.id).then(() => {
            res.status(200).json('Review deleted!');
        }).catch((error) => {
            next(error);
        })
    } catch (ex) {
        next(ex);
    }
});

//comment on a thread
router.post('/:id/comments', (req, res, next) => {
    const body = req.body;

    try {
        assert(typeof body.content == "string", "Invalid content!");
        assert(req.params.id.length === 19, "Invalid Id");

        User.findOne({email: res.get('email')}, {_id: 1}).then((user) => {
            return new Comment({
                user: user._id,
                postDate: Date.now(),
                content: body.content,
                edited: false,
                review: req.params.id,
                votes: {
                    topVotes: [],
                    downVotes: []
                }
            });
        }).then((comment) => comment.save()).then(() => {
            res.status(200).json('comment created!')
        }).catch((error) => {
            next(error)
        });
    } catch (ex) {
        next(ex);
    }
});

//get comments from a thread
router.get('/:id/comments', (req, res, next) => {
    try {
        assert(req.params.id.length === 19, "Invalid Id");

        Comment.find({review: req.params.id}).then((comments) => {
            res.status(200).json(comments);
        }).catch((error) => {
            next(error);
        });
    } catch (ex) {
        next(ex);
    }
});

module.exports = router;
