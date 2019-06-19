require('./config/config');

const express = require('express');
const path = require('path');
const expressEdge = require('express-edge');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');


var {mongoose} = require('./database/mongoose');
const bodyParser = require('body-parser');
const {Post} = require('./database/models/Post');
const {logger} = require('./logger/logger');
const fileUpload = require("express-fileupload");
const middleware = require('./middleware/posts-middleware')

const createPostPageController = require('./controllers/createPostPage')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserPageController = require("./controllers/createUserPage");
const storeUserController = require('./controllers/storeUser');
const loginPageController = require("./controllers/loginPage");
const loginUserController = require('./controllers/loginUser');



const app = new express();
const mongoStore = connectMongo(expressSession);


app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(fileUpload());
app.set('views', __dirname + '/views');
app.use('/posts/store', middleware.storePost);

app.use(expressSession({
    secret: 'sdfgFGg234235gwsgr234rzsegFHD3S',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", createPostPageController);
app.post("/posts/store", storePostController);
app.get("/auth/register", createUserPageController);
app.post("/users/register", storeUserController);
app.get('/auth/login', loginPageController);
app.post('/users/login', loginUserController);


app.listen(process.env.PORT, () => {
    logger.info(`App listening on port ${process.env.PORT}`);
});

module.exports = {app};
