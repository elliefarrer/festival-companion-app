/* global api, expect, describe, it, beforeEach, xit */

const User = require('../../models/user');

const userData =
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

const updateData =
{ firstName: 'No', lastName: 'No', userName: 'no', email: 'ellie@email.com', mobileNumber: '123', password: 'pass', passwordConfirmation: 'pass' };

describe('PUT /user/:id', () => {
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
    api.put(`/api/user/${userId}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/user/${userId}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/user/${userId}`)
      .end((err, res) => {
        expect(res.body.id).to.equal(userData.id);
        done();
      });
  });

  it('should return the updated data', done => {
    api.put(`/api/user/${userId}`)
      .send(updateData)
      .end((err, res) => {
        expect(res.body.userName).to.eq(updateData.userName);
        expect(res.body.email).to.eq(updateData.email);
        expect(res.body.fullName).to.eq(updateData.fullName);
        done();
      });
  });

  it('should keep the user id the same', done => {
    api.put(`/api/user/${userId}`)
      .end((err, res) => {
        expect(userData.id).to.eq(updateData.id);
        done();
      });
  });
});
