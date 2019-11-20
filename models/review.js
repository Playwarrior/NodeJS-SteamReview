const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO ADD VALIDATION!
const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    appId: {
        type: String,
        required: [true, 'AppId is required!']
    },
    title: {
        type: String,
        validate: {
            validator: function(v) {
                return /^.{1,100}$/.test(v);
            },
            msg: 'Title is empty or exceeds 100 characters!'
        },
        required: [true, 'Title is required! (Max. 100 characters)']
    },
    content: {
        type: String,
        validate: {
            validator: function(v) {
                return /^.+$/.test(v);
            },
            msg: 'Content is not valid or is empty!'
        },
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
}, {collections: 'reviews'});

ReviewSchema.virtual('upVotesCount').get(function() {
    return this.votes.upVotes.length;
});

// Virtual field of downVotes count
ReviewSchema.virtual('downVotesCount').get(function() {
    return this.votes.downVotes.length;
});

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;
