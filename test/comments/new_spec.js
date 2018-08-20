/* global describe, it, api, expect, beforeEach */

const User = require('../../models/user');
const CarShare = require('../../models/car-share');
const Festival = require('../../models/festival');
const jwt = require('jsonwebtoken');
const { secret } = require('../../config/environment');

let token;
let carShareId;

// TODO: Create a festival and a car share. Then test POSTing and DELETEing to
// /festivals/:festivalId/carShares/:carShareId/comments
const userData = {
  firstName: 'Max',
  lastName: 'Cramer',
  email: 'max@email.com',
  password: 'pass',
  passwordConfirmation: 'pass'
};

const carShareData = {
  from: {
    postcode: 'W2 1HQ',
    lat: 51.5167,
    lng: 0.1769
  },
  rideStartTime: '08.00PM',
  estimatedRideEndTime: '3.30PM'
};

const festivalData = {
  name: 'LoveBox',
  startDate: '13th July',
  endDate: '14th July',
  location: 'Gunnersbury Park',
  camping: 'No',
  headlining: ['Childish Gambino', 'Skepta', 'SZA'],
  photoUrl: 'https://24e8e3b95851cffc9b46-ce987c743c8a722dc56cea7f8eb55a8f.ssl.cf3.rackcdn.com/LBXLogoSimple.svg'

};


const commentData = {
  comment: [
    {name: 'Max', content: 'This is TESTING'}
  ]
};

describe('POST /festivals/:festivalId/carShares/:carShareId/comments', () => {
  let festivalId;
  beforeEach(done => {
    Promise.all([
      Festival.remove({}),
      CarShare.remove({}),
      User.remove({})
    ])
      .then(() => Festival.create(festivalData))
      .then(festival => {
        festivalId = festival._id;
        carShareData.festival = festivalId;
        return CarShare.create(carShareData);
      })
      .then(() => User.create(userData))
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, {expiresIn: '1hr'});
        done();
      });
  });
  it('should return a 401 without a token', done => {
    api.post(`/api/festivals/${festivalId}/carShares/${carShareId}/comments`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });
  it('should return a 201 with a token', done => {
    api.post(`/api/festivals/${festivalId}/carShares/${carShareId}/comments`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .send(commentData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
  it('should return an object', done => {
    api.post(`/api/festivals/${festivalId}/carShares/${carShareId}/comments`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .send(commentData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });
  it('should return the correct data', done => {
    api.post(`/api/festivals/${festivalId}/carShares/${carShareId}/comments`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .send(commentData)
      .end((err, res) => {
        expect(res.body.name).to.eq(commentData.name);
        expect(res.body.content).to.eq(commentData.content);
        done();
      });
  });
});
