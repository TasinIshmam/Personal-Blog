var mongoose = require('mongoose');
let {logger} = require('../logger/logger')

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true

}).then(() => logger.verbose("You are connected to the database"))
    .catch((err) => {
        logger.error(JSON.stringify(err, undefined, 4));
        console.log(err)

    });

module.exports = {mongoose};
