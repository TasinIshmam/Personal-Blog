const path = require('path')
const {Post} = require('../database/models/Post')



module.exports = async (req, res) => {

    const {image} = req.files;

    try {
        await image.mv(path.resolve(__dirname, '..', 'public/posts', image.name))
    } catch (e) {
        logger.error("Error saving image to public/posts folder in server");
        logger.error(e);
    }

    let post = req.body;
    post.image = `/posts/${image.name}`;
    console.debug(post);

    try {
        let postresult = await Post.create(post
        );
        console.log(postresult);
        res.redirect('/')
    } catch (e) {
        logger.error("Error storing new post data to mongo.")
        logger.error(e);
        res.status(400).send();
    }

}