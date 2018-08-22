/* global api, beforeEach, describe, expect, it, xit */

const User = require('../../models/user');
const { secret } = require('../../config/environment');
const jwt = require('jsonwebtoken');

const existingUserData =
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

const goodLoginData =
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

const faultyEmailData =
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@mismatch.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

const faultyPasswordData =
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass123'};

describe('POST /login', () => {

  let token;

  beforeEach(done => {
    User.remove({})
      .then(() => User.create(existingUserData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, {expiresIn: '1hr'});
        done();
      });
  });

  it('should return a 200 response', done => {
    api.post('/api/login')
      .send(goodLoginData)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
      });
    done();
  });

  it('should return a 401 response if email address is not connected to an existing user', done => {
    api.post('/api/login')
      .send(faultyEmailData)
      .then((err, res) => {
        expect(res.status).to.equal(401);
      });
    done();
  });

  it('should return a 401 respone if password does not match', done => {
    api.post('/api/login')
      .send(faultyPasswordData)
      .then((err, res) => {
        expect(res.status).to.equal(401);
      });
    done();
  });

});
