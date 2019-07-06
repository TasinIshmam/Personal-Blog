const {User} = require('../database/models/User')
const {logger} = require('../logger/logger')

module.exports = (req, res) => {

    //logger.debug(req.body);

    User.create(req.body, (error, user) => {
        if (error) {
            const registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)

            req.flash('registrationErrors', registrationErrors);
            logger.error(registrationErrors);
            return res.redirect('/auth/register')
        }

        req.session.userId = user._id;


    })
}