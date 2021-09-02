const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');

module.exports = app => {
    app.use('/auth', authController);
    app.use('/posts', postsController);
};