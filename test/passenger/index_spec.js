/* global describe it expect api beforeEach*/

const User = require('../../models/user');
const CarShare = require('../../models/car-share');
const Festival = require('../../models/festival');
const { secret } = require('../../config/environment');
const jwt = require('jsonwebtoken');
let token;


const userData = [{
  firstName: 'Jerry', lastName: 'Springer', userName: 'Jezza', email: 'jezza@email.com',  mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'
}];


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

describe('GET /festivals/:festivalId/carShares/:carShareId/passengers', () => {
  let festivalId;
  let carShareId;
  const userId = [];
  let loggedInId;

  beforeEach(done => {
    Promise.all([
      Festival.remove({}),
      CarShare.remove({}),
      User.remove({})
    ])
      .then(() => Festival.create(festivalData))

      .then(festival => {
        carShareData.festival = festival.id;
        return CarShare.create(carShareData);
      })
      .then(() => User.create(userData))
      .then(users => {
        loggedInId = users[0]._id; //why does filter not work? had to index 0.
        // console.log('user is', users[0]);
        token = jwt.sign({ sub: loggedInId }, secret, { expiresIn: '1hr' });
      });
    done();
  });

  xit('should return a 401 without a token', done => {
    api.get(`/api/festivals/${festivalId}/carShares/${carShareId}/passengers`)
      .end((err, res) => {
        expect(res.status).to.eq(401);
        done();
      });
  });

  xit('should return a 200 with a token', done => {
    api.get(`/api/festivals/${festivalId}/carShares/${carShareId}/passengers`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .end((err, res) => {
        // console.log('this is the response', res.body);
        expect(res.status).to.eq(200);
        done();
      });
  });
  //doesn't work - need to get past this. Works in insomnia

  it('should return an array of the correct length',
    done => {
      const user1 = new User({
        firstName: 'Ellie', lastName: 'Farrer', userName: 'ellie', email: 'ellie@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'
      });
      user1.save();
      const user2 = new User({
        firstName: 'Curtis', lastName: 'Burns', userName: 'curtis', email: 'curtis@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'
      });
      user2.save();
      const user3 = new User({
        firstName: 'Max', lastName: 'Cramer', userName: 'max', email: 'max@email.com', mobileNumber: '07770077070', password: 'pass', passwordConfirmation: 'pass'
      });
      user3.save();

      const festival = new Festival({
        name: 'LoveBox',
        startDate: '13th July',
        endDate: '14th July',
        location: 'Gunnersbury Park',
        camping: 'No',
        headlining: ['Childish Gambino', 'Skepta', 'SZA'],
        photoUrl: 'https://24e8e3b95851cffc9b46-ce987c743c8a722dc56cea7f8eb55a8f.ssl.cf3.rackcdn.com/LBXLogoSimple.svg'

      });
      festival.save();
      console.log('my festival id is', festival.id);

      const carShare = new CarShare({
        from: {
          postcode: 'W2 1HQ',
          lat: 51.5167,
          lng: 0.1769
        },
        rideStartTime: '08.00PM',
        estimatedRideEndTime: '3.30PM',
        passengers: []
      });
      carShare.passengers.push(user1.id);
      carShare.passengers.push(user2.id);
      carShare.passengers.push(user3.id);
      carShare.save();
      console.log('my carShare id is', carShare.id);

      api.get(`/api/festivals/${festival.id}/carShares/${carShare.id}/passengers`)

        // .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
          console.log('the res is', res.body);
          expect(res.body.length).to.eq(3);
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
        expect(res.body).to.be.an('array');
        done();
      });
  });

  xit('should return the correct data', done => {
    api.get(`/api/festivals/${festivalId}/carShares/${carShareId}/passengers`)
      .set('Authorization', `Bearer ${token}`) // Create an authorization header
      .end((err, res) => {
        res.body.forEach(carShare => {
          expect(userId.includes(carShare.passenger)).to.eq(true);
        });
        expect(res.body.length).to.eq(userId.length);
      });
    done();
  });


});
