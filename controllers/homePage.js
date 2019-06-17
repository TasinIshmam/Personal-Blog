const {Post} = require('../database/models/Post')
const {logger} = require('../logger/logger')

module.exports = async (req, res) => {


    try {
        const posts = await Post.find({});
        res.render("index", {
            posts
        });
    } catch (e) {
        logger.error(e);
        res.send(404);
    }


}