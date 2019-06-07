require('./config/config');
const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
var {mongoose} = require('./database/mongoose');
const bodyParser = require('body-parser');
const {Post} = require('./database/models/post');
const {logger} = require('./logger/logger');
const fileUpload = require("express-fileupload");
const middleware = require('./middleware/posts-middleware')
const app = new express();

app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.set('views', __dirname + '/views');
app.use('/posts/store', middleware.storePost);

app.get('/', async (req, res) => {

    const posts = await Post.find({});
    res.render('index', {
        posts
    });
});


app.get('/post/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});


app.get('/posts/new', (req, res) => {
    res.render('create');
});

app.post('/posts/store', async (req, res) => {

    const {image} = req.files;

    try {
        await image.mv(path.resolve(__dirname, 'public/posts', image.name))
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
            res.redirect('/')
        } catch (e) {
            logger.error("Error storing new post data to mongo.")
            logger.error(e);
            res.status(400).send();
        }

});

app.listen(process.env.PORT, () => {
    logger.info(`App listening on port ${process.env.PORT}`);
});