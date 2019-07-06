
const {logger} = require('../logger/logger')

module.exports = (req, res) => {

    //note that the if condition is redundant. We already check if the user has a session userId and if that Id is valid in the db in our auth.js middleware.
    if (req.session.userId) {
        return res.render("create");
    }

    res.redirect('/auth/login')
};