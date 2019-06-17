const {Post} = require('../database/models/Post')
const {logger} = require('../logger/logger')

module.exports = async (req, res) => {

    try {
        const post = await Post.findById(req.params.id);

        if(post === undefined || post === null) {
            throw new Error(`No post with the given id ${req.params.id}`);
        }

        res.render("post", {
            post
        });
    } catch (e) {
        logger.error(e);
        res.send(404);
    }

}