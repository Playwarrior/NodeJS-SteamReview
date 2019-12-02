const express = require('express');
const request = require('request');
const Comment = require('../../models/comment');

const NullSector = require('../../util/nullsector');
const {formatComments} = require("../../util/format");

const router = express.Router();

router.get('/:reviewId', (req, res, next) => {
    Comment.find({review: req.params.reviewId}).then((comments) => {
        res.status(200).json(formatComments(comments));
    }).catch((error) => {
        next(error);
    })
});

module.exports = router;
