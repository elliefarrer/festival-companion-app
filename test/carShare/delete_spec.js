/* global describe it expect api beforeEach*/

const User = require('../../models/user');
const CarShare = require('../../models/car-share');
const Festival = require('../../models/festival');
const { secret } = require('../../config/environment');
const jwt = require('jsonwebtoken');
let token;

const userData = {
  firstName: 'Jerry', lastName: 'Springer', userName: 'Jezza', email: 'jezza@email.com',  mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'
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

describe('DELETE /carShares', () => {
  let festivalId;
  let carShareId;
  beforeEach(done => {

    // Festival.remove({})
    //   .then(() => {
    //     return CarShare.remove({})
    //   })
    Promise.all([
      Festival.remove({}),
      CarShare.remove({}),
      User.remove({})
    ])
    // TODO PICK ONE OF THE ABOVE
      .then(() => Festival.create(festivalData))

      .then(festival => {
        festivalId = festival._id;
        carShareData.festival = festivalId;
        return CarShare.create(carShareData);
      })
      .then((carShare) => {
        carShareId = carShare._id;
        return User.create(userData);
      })
      .then(user => {
        token = jwt.sign({ sub: user.id }, secret, {expiresIn: '1hr'});
        done();
      });
  });

  it('should return a 401 without a token', done => {
    api.delete(`/api/festivals/${festivalId}/carShares/${carShareId}`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 204 with a token', done => {
    api.delete(`/api/festivals/${festivalId}/carShares/${carShareId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should delete the carShare', done => {
    api.delete(`/api/festivals/${festivalId}/carShares/${carShareId}`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .then(() => CarShare.find())
      .then(carShare => {
        expect(carShare.length).to.eq(0);
        done();
      });
  });
});
