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

function formatComment(comment, user) {
    let upVoteCount = comment.votes.upVotes.length;
    let downVoteCount = comment.votes.downVotes.length;
    let isUpVoted = comment.votes.upVotes.includes(user);
    let isDownVoted = comment.votes.downVotes.includes(user);

    return {
        _id: comment._id,
        user: comment.user,
        review: comment.review,
        content: comment.content,
        postDate: comment.postDate,
        edited: comment.edited,
        upVoteCount: upVoteCount,
        downVoteCount: downVoteCount,
        isUpVoted: isUpVoted,
        isDownVoted: isDownVoted
    }
}

function formatComments(comments, user){
    let array = [];

    for(let comment of comments) {
        array.push(formatComment(comment, user));
    }

    return array;
}

function formatProfile(profile, id) {
    profile.id = id;

    return profile;
}

module.exports = {formatReview, formatReviews, formatComment, formatComments, formatProfile};
