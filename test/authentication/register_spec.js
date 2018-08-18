/* global api, beforeEach, describe, expect, it, xit */

const User = require('../../models/user');

const existingUserData =
{firstName: 'Curtis', lastName: 'Burns', userName: 'curtis', email: 'curtis@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

const goodUserData =
{firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

const matchingUserData =
{firstName: 'Test', lastName: 'Test', userName: 'curtis', email: 'curtis@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

const faultyPasswordUserData =
{firstName: 'Test', lastName: 'Test', userName: 'test', email: 'curtis@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass123'};

describe('POST /register', () => {

  beforeEach(done => {
    User.remove({})
      .then(User.create(existingUserData))
    done();
  });

  it('should return a 200 response', done => {
    api.post('/api/register')
      .send(goodUserData)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        done();
      });
  });

  it('should add user to database', done => {
    api.post('/api/register')
      .send(goodUserData)
      .then(() => User.find())
      .then(User => {
        expect(User.length).to.equal(2);
      });
    done();
  });

  it('should return a 500 response if the email and username aren\'t unique', done => {
    api.post('/api/register')
      .send(matchingUserData)
      .then((err, res) => {
        expect(res.status).to.eq(500);
      });
    done();
  });

  it('should return a 500 response if passwordConfirmation doesn\'t match password', done => {
    api.post('/api/register')
      .send(faultyPasswordUserData)
      .then((err, res) => {
        expect(res.status).to.eq(500);
      });
    done();
  });
});
