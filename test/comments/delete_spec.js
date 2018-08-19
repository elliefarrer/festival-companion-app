/* global api, expect, describe, it, beforeEach */
const Comment = require('../../models/festival');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let token;
let commentId;


const userData = {
  firstName: 'Max',
  lastName: 'Cramer',
  email: 'max@email.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const commentsData = {
  name: 'Max',
  content: 'This is a great place to be!'
};


describe('DELETE /comment/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr' });
        return Comment.remove({});
      })
      .then(() => Comment.create(commentsData))
      .then(comment => {
        commentId = comment.id;
        done();
      });
  });
  it('should return a 204 with a token', done => {
    api.delete(`/api/festivals/${commentId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });
  it('should delete the comment', done => {
    api.delete(`/api/festivals/${commentId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .then(() => Comment.find())
      .then(comments => {
        expect(comments.length).to.eq(0);
        done();
      });
  });
});
