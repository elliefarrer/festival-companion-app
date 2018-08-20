/* global describe it expect api beforeEach*/

const User = require('../../models/user');
const CarShare = require('../../models/car-share');
const Festival = require('../../models/festival');
const { secret } = require('../../config/environment');
const jwt = require('jsonwebtoken');
let token;


const userData = [
  {firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'},
  {firstName: 'Curtis', lastName: 'Burns', userName: 'curtis', email: 'curtis@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'},
  {firstName: 'Max', lastName: 'Cramer', userName: 'max', email: 'max@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'}
];


const carShareData = {
  from: {
    postcode: 'W2 1HQ',
    lat: 51.5167,
    lng: 0.1769
  },
  rideStartTime: '08.00PM',
  estimatedRideEndTime: '3.30PM',
  passengers: []
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

describe('POST /festivals/:festivalId/carShares/:carShareId/passengers', () => {
  let festivalId;
  let carShareId;
  const userId = [];
  let loggedInId;

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
        console.log('carshare id is', carShareId);
        return User.create(userData);
      })
      .then(users => {

        loggedInId = users[0].id; //why does filter not work? Index 0?
        console.log('user is', users[0]);
        token = jwt.sign({ sub: loggedInId, admin: false }, secret, { expiresIn: '1hr' });
        userId[0] = loggedInId;

        userId[1] = users[1].id;

        userId[2] = users[2].id;

        return CarShare.find();
      })
      .then(carShare => {
        for ( let i = 0; i <= 2; i++) {
          // console.log(userId[i]);
          // console.log(carShare[0].passengers);
          carShare[0].passengers.push(userId[i]); //why is do I have to index 0?
        }
        carShare.save();
        done();
      });
  });

  it('should return a 401 without a token', done => {
    api.post(`/api/festivals/${festivalId}/carShares/${carShareId}/passengers`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  xit('should return a 200 with a token', done => {
    api.post(`/api/festivals/${festivalId}/carShares/${carShareId}/passengers`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .end((err, res) => {
        console.log('this is the response', res.body);
        expect(res.status).to.eq(200);
        done();
      });
  });
  //doesn't work - need to get past this. Works in insomnia

  xit('should return an array', done => {
    api.get(`/api/festivals/${festivalId}/carShares/${carShareId}/passengers`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .end((err, res) => {
        console.log('this is the response', res.body);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  xit('should return an array of objects', done => {
    api.get(`/api/festivals/${festivalId}/carShares/${carShareId}/passengers`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .end((err, res) => {
        res.body.forEach(passenger => {
          expect(passenger).to.be.an('object');
        });
        done();
      });
  });

  xit('should return the correct data', done => {
    api.get(`/api/festivals/${festivalId}/carShares/${carShareId}/passengers`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .end((err, res) => {
        res.body.forEach(carShare => {
          expect(carShare.pendingPassenger[0].id).to.eq(loggedInId);
        });
        expect(res.body.length).to.eq(1);
      });
    done();
  });


});
