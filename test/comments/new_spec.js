/* global describe, it, api, expect, beforeEach */

const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let token;


const userData = {
  firstName: 'Max',
  lastName: 'Cramer',
  email: 'max@email.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const commentData = {
  comment: [
    {name: 'Max', content: 'This is TESTING'}
  ]
};

describe('POST /festivals', () => {
  beforeEach(done => {
    User.remove({}) // Empty object is where you can put paramaters!!! Leave empty = NO Paramaters!!!
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr' });
        done();
      });
  });
  it('should return a 401 without a token', done => {
    api.post('/api/festivals')
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 201 with a token', done => {
    api.post('/api/festivals')
      .set('Authorization', `Bearer ${token}`) // Creates an Authorization Header
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should return a comment', done => {
    api.post('/api/festivals')
      .set('Authorization', `Bearer ${token}`) // Creates an Authorization Header
      .send(commentData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should return the correct data', done => {
    api.post('/api/festivals')
      .set('Authorization', `Bearer ${token}`) // Creates an Authorization Header
      .send(commentData)
      .end((err, res) => {
        expect(res.body.name).to.eq(commentData.name); // PUT ALL REQUIRED FIELDS HERE!
        expect(res.body.content).to.eq(commentData.content);
        done();
      });
  });
});
