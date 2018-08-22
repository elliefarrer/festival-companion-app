/* global api, expect, describe, it, beforeEach, xit */

const User = require('../../models/user');

const userData =
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

describe('DELETE /user/:id', () => {
  let userId;

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id;
        done();
      });
  });

  it('should return a 204 with a token', done => {
    api.delete(`/api/user/${userId}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should should delete the user', done => {
    api.delete(`/api/users/${userId}`)
      .then(() => User.find())
      .then(users => {
        expect(users.length).to.eq(0);
      });
    done();
  });
});
