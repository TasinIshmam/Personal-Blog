const path = require('path')
const {Post} = require('../database/models/Post')
const {logger} = require('../logger/logger')



module.exports = async (req, res) => {

    let post = req.body;



    try {
        if( req.files !== undefined) {
            const {image} = req.files;
            await image.mv(path.resolve(__dirname, '..', 'public/posts', image.name))
            post.image = `/posts/${image.name}`;
        }
    } catch (e) {
        logger.error("Error saving image to public/posts folder in server. Using default image for post instead.");
        logger.error(e);
    }


    try {
        let postresult = await Post.create(post
        );
        res.redirect('/')
    } catch (e) {
        logger.error("Error storing new post data to mongo.")
        logger.error(e);
        return res.redirect('/posts/new');
    }

}