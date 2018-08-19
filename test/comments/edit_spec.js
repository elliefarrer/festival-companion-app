/* global api, expect, describe, it, beforeEach */
const Comment = require('../../models/festival');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let token; // token is global
let commentId;

const userData = {
  firstName: 'Max',
  lastName: 'Cramer',
  email: 'max@email.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const commentData = {
  comment: [
    {name: 'Max', content: 'This is EDIT- TESTING'}
  ]
};

describe('PUT Testing the Edit route /festivals/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr' });
        return Comment.remove({});
      })
      .then(() => Comment.create(commentData))
      .then(comment => {
        commentId = comment.id;
        done();
      });
  });

  it('should return a 401 without a token', done => {
    api.put(`/api/festivals/${commentId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 200 with a token', done => {
    api.put(`/api/festivals/${commentId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });
  it('should return a comment', done => {
    api.put(`/api/festivals/${commentId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .send(commentData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should return the updated comment', done => {
    api.put(`/api/festivals/${commentId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .send(commentId)
      .end((err, res) => {
        expect(res.body.name).to.eq(commentData.name);
        expect(res.body.content).to.eq(commentData.contnet);
        done();
      });
  });
});
