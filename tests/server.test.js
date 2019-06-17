const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const User = require('../database/models/User')
const {app} = require('../index');
const { users, populateUsers} = require('./seed');


beforeEach(populateUsers);

