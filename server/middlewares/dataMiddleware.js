const postServices = require('../services/postServices');
const userServices = require('../services/userServices');

module.exports = () => (req, res, next) => {
    req.data = {
        ...postServices,
        ...userServices,
    };

    next();
};