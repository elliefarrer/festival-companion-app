/* global api, beforeEach, describe, expect, it, xit */

const User = require('../../models/user');
const userData =
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};


describe('GET /user/:id', () => {
  let userId;

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        userId = user._id;
        done();
      });
  });

  it('should return a 200 response', done => {
    api.get(`/api/user/${userId}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/user/${userId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });


  it('should return the correct data', done => {
    api.get(`/api/user/${userId}`)
      .end((err, res) => {
        expect(res.body.id).to.eq(userData.id);
        done();
      });
  });
});
