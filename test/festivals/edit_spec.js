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

const updateData = {
  name: 'UltraFest',
  location: 'Watford'
};

describe('PUT Testing the Edit route /festivals/:id', () => {
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
    api.put(`/api/festivals/${festivalId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 200 with a token', done => {
    api.put(`/api/festivals/${festivalId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .send(updateData)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/festivals/${festivalId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .send(updateData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the updated data', done => {
    api.put(`/api/festivals/${festivalId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .send(updateData)
      .end((err, res) => {
        expect(res.body.name).to.eq(updateData.name);
        expect(res.body.location).to.eq(updateData.location);
        done();
      });
  });

});
