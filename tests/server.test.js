const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const User = require('../database/models/User')
const {app} = require('../index');
const { users, populateUsers} = require('./seed');


beforeEach(populateUsers);
//
// it('should create a new todo', (done) => {
//     var text = 'Test todo text';
//
//     request(app)
//         .post('/todos')
//         .send({text})
//         .expect(200)
//         .expect((res) => {
//             expect(res.body.text).toBe(text);
//         })
//         .end((err, res) => {
//             if (err) {
//                 return done(err);
//             }
//
//             Todo.find({text}).then((todos) => {
//                 expect(todos.length).toBe(1);
//                 expect(todos[0].text).toBe(text);
//                 done();
//             }).catch((e) => done(e));
//         });
// });

describe('POST /users/register' , () => {
    it('should register a new user', function (done) {
        let user = {
            username: 'testUser',
            email: 'testUser@gmail.com',
            password: 'testUserPass'
        }



        request(app)
            .post('/users/register')
            .send(user)
            .expect(302)
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                User.find({email : user.email}).then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].username).toBe(user.username);
                    done();
                })
            });


    });
});