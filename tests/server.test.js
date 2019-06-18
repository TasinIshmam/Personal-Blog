const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {Post} = require('../database/models/Post');

const {User} = require('../database/models/User')
const {app} = require('../index');
const {users, populateUsers, posts, populatePosts} = require('./seed');



beforeEach(populateUsers);
beforeEach(populatePosts);
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


    it('should register a new user and redirect to index page', function (done) {
        let user = {
            username: 'testUser',
            email: 'testUser@gmail.com',
            password: 'testUserPass'
        }



        request(app)
            .post('/users/register')
            .send(user)
            .expect(302)
            .expect((res) => {
                expect(res.headers.location).toBe('/');
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                User.find({email : user.email}).then((users) => {
                    expect(users.length).toBe(1);
                    expect(users[0].username).toBe(user.username);
                    done();
                }).catch( (err) => {
                    done(err);
                })
            });


    });


});


describe('POST /posts/store"', ()=> {

    it('should create a new post and redirect to index page', function (done) {
        let post = {
            "username" : "testUser3",
            "title" : "testTitle3",
            "description" : "testDescription3",
            "content" : "testContent3",
        };

        request(app)
            .post('/posts/store')
            .send(post)
            .expect(302)
            .expect((res) => {
                expect(res.headers.location).toBe('/');
            })
            .end((err, res) => {
                if(err) {
                    return done(err);
                }

                Post.find(post).then((posts) => {
                    expect(posts.length).toBe(1);
                    expect(posts[0].image).toBe('/posts/default.jpeg');
                    done();
                }).catch( (err) => {
                    done(err);
                });
            });

    });


    it('should redirect to /posts/new if trying to create a post with invalid data', function (done) {
        let post = {
            "username" : "testUser3",
            "title" : "",
            "description" : "testDescription3",
            "content" : "testContent3",
        };

        request(app)
            .post('/posts/store')
            .send(post)
            .expect(302)
            .expect((res) => {
                expect(res.headers.location).toBe('/posts/new');
            })
            .end(done);
    })
});


describe('GET /post/:id', ()=> {

    it('should show post with given id', function (done) {

        request(app)
            .get(`/post/${posts[0]._id}`)
            .expect(200)
            .end(done);

    });

    it('should return 404 if post not found', function (done) {

        var hexId = new ObjectID();


        request(app)
            .get(`/post/${hexId}`)
            .expect(404)
            .end(done);

    });


})