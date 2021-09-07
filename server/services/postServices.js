const User = require('../models/User');
const Post = require('../models/Post');

async function getAllPosts() {
    return await Post.find({});
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
    const post = await Post.findById(id).populate('owner');
    post.owner.password = '';
    return post;
}

async function editPost(body, id) {
    const current = await Post.findById(id);

    if(!current) {
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
    post.likes.splice(userPostIdx,1);
    await post.save();
}

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    editPost,
    deletePost,
    likePost,
    dislikePost,
};