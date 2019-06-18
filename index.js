require('./config/config');

const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');

var {mongoose} = require('./database/mongoose');
const bodyParser = require('body-parser');
const {Post} = require('./database/models/Post');
const {logger} = require('./logger/logger');
const fileUpload = require("express-fileupload");
const middleware = require('./middleware/posts-middleware')

const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserController = require("./controllers/createUser");
const storeUserController = require('./controllers/storeUser');
const loginController = require("./controllers/login");


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

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", createPostController);
app.post("/posts/store", storePostController);
app.get("/auth/register", createUserController);
app.post("/users/register", storeUserController);
app.get('/auth/login', loginController);


app.listen(process.env.PORT, () => {
    logger.info(`App listening on port ${process.env.PORT}`);
});

module.exports = {app};
