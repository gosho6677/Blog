const User = require('../models/User');

async function getCurrentUser(userId) {
    return await User.findById(userId).populate('posts');
}

module.exports = {
    getCurrentUser,
};