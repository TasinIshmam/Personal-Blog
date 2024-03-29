require('./config/config');

const express = require('express');
const path = require('path');
const edge = require("edge.js");

const expressEdge = require('express-edge');
const expressSession = require('express-session');
const connectMongo = require('connect-mongo');
const connectFlash = require("connect-flash");
//todo add flash messages to all user caused errors.


var {mongoose} = require('./database/mongoose');
const bodyParser = require('body-parser');
const {Post} = require('./database/models/Post');
const {logger} = require('./logger/logger');
const fileUpload = require("express-fileupload");
const middleware = require('./middleware/posts-middleware')
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')


const createPostPageController = require('./controllers/createPostPage')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const createUserPageController = require("./controllers/createUserPage");
const storeUserController = require('./controllers/storeUser');
const loginPageController = require("./controllers/loginPage");
const loginUserController = require('./controllers/loginUser');
const logoutController = require("./controllers/logoutUser");




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
app.use(connectFlash());


app.use(expressSession({
    secret: 'sdfgFGg234235gwsgr234rzsegFHD3S',
    resave: false,
    saveUninitialized: true,
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));



app.use('*', (req, res, next) => {

    let userId;

    logger.debug(req.session);

    if(req.session) {
        if(req.session.userId) {
            userId = req.session.userId;
        }
    }

    logger.debug("Inside * middleware. userid is" , userId);
    edge.global('auth', userId)
    next()
});

//todo understand sessions better, understand the options you're giving to express Session and figure out a way to test them properly.

app.get("/", homePageController);
app.get("/post/:id", getPostController);
app.get("/posts/new", auth, createPostPageController);
app.post("/posts/store", auth, storePostController);
app.get("/auth/register", redirectIfAuthenticated, createUserPageController);
app.post("/users/register", redirectIfAuthenticated, storeUserController);
app.get('/auth/login', redirectIfAuthenticated, loginPageController);
app.post('/users/login', redirectIfAuthenticated, loginUserController);
app.get("/auth/logout",  logoutController);


app.listen(process.env.PORT, () => {
    logger.info(`App listening on port ${process.env.PORT}`);
});

module.exports = {app};
