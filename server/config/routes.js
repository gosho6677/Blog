const authController = require('../controllers/authController');
const postsController = require('../controllers/postsController');
const userController = require('../controllers/userController');

module.exports = app => {
    app.use('/auth', authController);
    app.use('/posts', postsController);
    app.use('/user', userController);
};