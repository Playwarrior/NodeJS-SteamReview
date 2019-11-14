const express = require('express');
const router = express.Router();
const assert = require('assert');

const Comment = require('../../models/comment');

//TODO: WHEN REWRITING A COMMENT ONLY LET THE AUTHOR REWRITE IT!

router.get('/:id', (req, res, next) => {
    try {
        assert(req.params.id.length === 19, "Invalid Id");

        Comment.findOne({_id: req.params.id}).then((comment) => {
            if (comment === null || comment === undefined)
                next(new Error('No comment found!'));

            else
                res.status(200).json(comment);

        }).catch((error) => {
            next(error);
        });
    } catch (ex) {
        next(ex);
    }
});

router.put('/:id', (req, res, next) => {
    try {
        assert(req.params.id.length === 19, "Invalid Id");
        assert(typeof req.body.content == "string", "Invalid content!");

        Comment.findByIdAndUpdate(req.params.id, {
            content: req.body.content,
            edited: true
        }).then(() => {
            res.status(200).json("Comment updated!");
        }).catch((error) => {
            next(error);
        })
    } catch (ex) {
        next(ex);
    }
});

router.delete('/:id', (req, res, next) => {
   try {
       assert(req.params.id.length === 19, "Invalid Id");

       Comment.findByIdAndRemove(req.params.id).then(() => {
            res.status(200).json("Comment deleted!");
       }).catch((error) => {
           next(error);
       });

   } catch(ex){
       next(ex);
   }
});

//TODO ADD UPVOTE & DOWNVOTE ROUTE

module.exports = router;
