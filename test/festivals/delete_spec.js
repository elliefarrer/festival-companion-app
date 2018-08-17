/* global api, expect, describe, it, beforeEach */
const Festival = require('../../models/festival');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let token; // token is global
let festivalId;

const userData = {
  firstName: 'Max',
  lastName: 'Cramer',
  email: 'max@email.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const festivalData = {
  name: 'bestival',
  location: 'Huddersfield'
};


describe('DELETE /festival/:id', () => {
  beforeEach(done => {
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, { expiresIn: '1hr' });
        return Festival.remove({});
      })
      .then(() => Festival.create(festivalData))
      .then(festival => {
        festivalId = festival.id;
        done();
      });
  });

  it('should return a 401 without a token', done => {
    api.delete(`/api/festivals/${festivalId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 with a token', done => {
    api.delete(`/api/festivals/${festivalId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should delete the whiskey', done => {
    api.delete(`/api/festivals/${festivalId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .then(() => Festival.find())
      .then(festivals => {
        expect(festivals.length).to.eq(0);
        done();
      });
  });
});
