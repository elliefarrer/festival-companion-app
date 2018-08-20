/* global api, beforeEach, describe, expect, it, xit */

const mongoose = require('mongoose');
const { secret } = require('../../config/environment');
const jwt = require('jsonwebtoken');


const User = require('../../models/user');
const userData =
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'};

const Festival = require('../../models/festival');
const festivalData =
{name: 'LoveBox', startDate: '13th July', endDate: '14th July', location: 'Gunnersbury Park', camping: 'No', headlining: ['Childish Gambino', 'Skepta', 'SZA'], attendees: [{ type: mongoose.Schema.ObjectId, ref: 'Users'}], photoUrl: 'https://24e8e3b95851cffc9b46-ce987c743c8a722dc56cea7f8eb55a8f.ssl.cf3.rackcdn.com/LBXLogoSimple.svg'};

describe('GET /attendees', () => {
  let festivalId;
  let token;

  beforeEach(done => {
    Festival.remove({})
      .then(() => Festival.create(festivalData))
      .then(festival => {
        festivalId = festival._id;
      });
    User.remove({})
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, {expiresIn: '1hr'});
      });
    done();
  });

  it('should return a 401 token without a token', done => {
    api.get(`/api/festivals/${festivalId}/attendees`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
      });
    done();
  });

  it('should return a 200 response', done => {
    api.get(`/api/festivals/${festivalId}/attendees`)
      .set('Authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
      });
    done();
  });

  it('should return an object', done => {
    api.get(`/api/festivals/${festivalId}/attendees`)
      .set('Authorization', `Bearer ${token}`);
    console.log('festival id is', festivalId)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
      });
    done();
  });

  xit('should return the correct data', done => {
    api.get(`/api/festivals/${festivalId}/attendees`)
      .end((err, res) => {
        console.log('Res body id is', res.body.id);
        expect(res.body.id).to.eq(userData.id);
      });
    done();
  });

});
