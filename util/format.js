function formatReview(review, user) {
    let upVoteCount = review.votes.upVotes.length;
    let downVoteCount = review.votes.downVotes.length;
    let isUpVoted = review.votes.upVotes.includes(user);
    let isDownVoted = review.votes.downVotes.includes(user);


    return {
        _id: review._id,
        user: review.user,
        appId: review.appId,
        title: review.title,
        content: review.content,
        postDate: review.postDate,
        edited: review.edited,
        upVoteCount: upVoteCount,
        downVoteCount: downVoteCount,
        isUpVoted: isUpVoted,
        isDownVoted: isDownVoted
    }
}

function formatReviews(reviews, user){
    let array = [];

    for(let review of reviews) {
        array.push(formatReview(review, user));
    }

    return array;
}

module.exports = {formatReview, formatReviews};
