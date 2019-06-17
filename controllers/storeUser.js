const User = require('../database/models/User')
const {logger} = require('../logger/logger')

module.exports = (req, res) => {

    //logger.debug(req.body);

    User.create(req.body, (error, user) => {
        if (error) {
            return res.redirect('/auth/register')
        }
        res.redirect('/')
    })
}