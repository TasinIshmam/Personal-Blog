const User = require('../database/models/User')
const {logger} = require('../logger/logger')

module.exports = (req, res, next) => {
    if (req.session.userId) {
        logger.debug(req.session.userId);
        return res.redirect('/')
    }

    next()
}