const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO: ADD VALIDATION!
const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: 'review'
    },
    content: String,
    postDate: Date,
    edited: Boolean,
    votes: {
        upVotes: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }],
        downVotes: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    }
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
