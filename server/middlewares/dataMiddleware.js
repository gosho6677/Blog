const postServices = require('../services/postServices');

module.exports = () => (req, res, next) => {
    req.data = {
        ...postServices
    };

    next();
};