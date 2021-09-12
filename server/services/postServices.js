const User = require('../models/User');
const Post = require('../models/Post');
const Comment = require('../models/Comment');

async function getAllPosts(query) {
    let posts;

    const type = {
        asc: 1,
        desc: -1
    };
    // using only front end sorting atm might use it in future. (aggregation framework)
    if (query) {
        posts = await Post.aggregate(
            [
                {
                    "$project": {
                        "title": 1,
                        "description": 1,
                        "imageUrl": 1,
                        "likes": 1,
                        "length": { "$size": "$likes" }
                    }
                },
                { "$sort": { "length": type[query] } }
            ]
        );
    } else {
        posts = await Post.find({});
    }

    return posts;
}

async function getTopThree() {
    const posts = await Post.aggregate(
        [
            {
                "$project": {
                    "title": 1,
                    "description": 1,
                    "imageUrl": 1,
                    "likes": 1,
                    "length": { "$size": "$likes" }
                }
            },
            { "$sort": { "length": -1 } },
            { "$limit": 3 }
        ]
    );
    return posts;
}

async function createPost(body) {
    const post = new Post(body);
    const userId = body.owner;
    const user = await User.findById(userId);

    user.posts.push(post);

    await user.save();
    await post.save();

    return post;
}

async function getPostById(id) {
    const post = await Post
        .findById(id)
        .populate('owner', '-password -posts -__v')
        .populate({ path: 'comments', populate: { path: 'owner', model: 'User', select: '-posts -password -iat -__v' } });

    return post;
}

async function editPost(body, id) {
    const current = await Post.findById(id);

    if (!current) {
        throw new Error('No such post in database.');
    }

    Object.assign(current, body);
    current.save();
    return current;
}

async function deletePost(userId, id) {
    let user = await User.findById(userId);

    const idxOfPost = user.posts.indexOf(id);
    user.posts.splice(idxOfPost, 1);

    await user.save();
    await Post.findByIdAndDelete(id);
}

async function likePost(userId, postId) {
    let post = await Post.findById(postId);

    post.likes.push(userId);
    await post.save();
}

async function dislikePost(userId, postId) {
    let post = await Post.findById(postId);
    let userPostIdx = post.likes.indexOf(userId);
    post.likes.splice(userPostIdx, 1);
    await post.save();
}

async function commentPost(description, postId, userId) {
    const comment = new Comment({ description });
    const post = await Post.findById(postId);
    const time = Date.now();

    comment.owner = userId;
    comment.iat = time;
    comment.unixTime = time;
    post.comments.push(comment);

    await comment.save();
    await post.save();

    return comment.populate('owner', '-password');
}

async function deleteComment(postId, commentId) {
    const post = await Post.findById(postId);

    const commentIdx = post.comments.indexOf(commentId);
    post.comments.splice(commentIdx, 1);

    await Comment.findByIdAndDelete(commentId);
}

module.exports = {
    getAllPosts,
    getTopThree,
    createPost,
    getPostById,
    editPost,
    deletePost,
    likePost,
    dislikePost,
    commentPost,
    deleteComment,
};