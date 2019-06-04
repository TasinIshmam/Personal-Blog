require('./config/config');
const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
var {mongoose} = require('./database/mongoose');
const bodyParser = require('body-parser');
const Post = require('./database/models/post');


const app = new express();


app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', __dirname + '/views');


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

    try {
        let postresult = await Post.create(req.body);
        res.redirect('/')
    } catch (e) {
        console.log(e);
        res.status(400).send();
    }
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on port ${process.env.PORT}`);
});