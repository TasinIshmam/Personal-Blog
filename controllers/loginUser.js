const bcrypt = require('bcrypt')
const {User} = require('../database/models/User')

module.exports = (req, res) => {
    const {
        email,
        password
    } = req.body;
    // try to find the user
    User.findOne({
        email
    }, (error, user) => {
        if (user) {
            // compare passwords.
            bcrypt.compare(password, user.password, (error, same) => {
                if (same) {
                    req.session.userId = user._id

                    // store user session.
                    res.redirect('/')
                } else {
                    req.flash('loginErrors', ['Incorrect username or password.']);
                    res.redirect('/auth/login')
                }
            })
        } else {
            req.flash('loginErrors', 'Incorrect username or password.');
            return res.redirect('/auth/login')
        }
    })
}