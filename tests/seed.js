const {ObjectID} = require('mongodb');
const User = require('../database/models/User');



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


const populateUsers = (done) => {
    User.deleteMany({}).then(() => {
        return User.create(users);
    }).then(() => done());
};


module.exports = { users, populateUsers};
