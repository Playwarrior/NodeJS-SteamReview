const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//TODO ADD VALIDATION!
const ReviewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    appId: Number,
    title: String,
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

const Review = mongoose.model('review', ReviewSchema);

module.exports = Review;
