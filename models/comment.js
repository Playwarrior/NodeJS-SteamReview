const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    review: {
        type: Schema.Types.ObjectId,
        ref: 'review'
    },
    content: {
        type: String,
        required: [true, 'Content is required!']
    },
    postDate: {
        type: Date,
        default: Date.now()
    },
    edited: {
        type: Boolean,
        default: false
    },
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
}, {collection: 'comments'});

CommentSchema.virtual('upVotesCount').get(function() {
    return this.votes.upVotes.length;
});

// Virtual field of downVotes
CommentSchema.virtual('downVotesCount').get(function() {
    return this.votes.downVotes.length;
});

const Comment = mongoose.model('comment', CommentSchema);

module.exports = Comment;
