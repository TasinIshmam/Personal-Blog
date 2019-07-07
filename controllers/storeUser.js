const {User} = require('../database/models/User')
const {logger} = require('../logger/logger')

module.exports = (req, res) => {

    //logger.debug(req.body);

    User.create(req.body, (error, user) => {
        if (error) {

            let registrationErrors;


            if(error.errors) {
                 registrationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
            } else {
                registrationErrors = [error];
            }

            req.flash('registrationErrors', registrationErrors);
            logger.error(error);
            return res.redirect('/auth/register')
        }

        req.session.userId = user._id;
        logger.debug("User successfuflly created");
        res.redirect('/');

    })
}