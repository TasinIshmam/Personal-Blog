var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true

}).then(() => console.log("You are connected to the database"))
    .catch((err) => {
        console.log("Error connecting to the database", err);
    });

module.exports = {mongoose};
