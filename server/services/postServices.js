const User = require('../models/User');
const Post = require('../models/Post');

async function getAllPosts() {
    return await Post.find({}).lean;
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

module.exports = {
    getAllPosts,
    createPost,
    getPostById,
    editPost,
    deletePost,
};