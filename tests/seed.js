const {ObjectID} = require('mongodb');
const {User} = require('../database/models/User');
const {Post} = require('../database/models/Post');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
    _id: userOneId,
    username: 'username1',
    email: 'andrew@example.com',
    password: 'userOnePass',

}, {
    _id: userTwoId,
    username: 'username2',
    email: 'jen@example.com',
    password: 'userTwoPass'
}];


const postOneId = new ObjectID();
const postTwoId = new ObjectID();
const posts = [ {
    _id : postOneId,
    "username" : "testUser1",
    "title" : "testTitle1",
    "description" : "testDescription1",
    "content" : "testContent1",
    "image" : "/posts/pexels-photo-414612.jpeg",
} , {
    _id : postTwoId,
    "username" : "testUser2",
        "title" : "testTitle2",
        "description" : "testDescription2",
        "content" : "testContent2",
        "image" : "/posts/download.jpeg",
    }

]

const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        return User.create(users);
    }).then(() => done());
};


const populatePosts = (done) => {
    Post.deleteMany({}).then(() => {
        return Post.create(posts);
    }).then(() => done());
};








module.exports = { users, populateUsers, posts, populatePosts};
