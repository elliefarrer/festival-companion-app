// TODO: Not finished. And may need to put in if statements to prevent multiple
// requests and duplicate passengers

// This controller will add and remove passengers from carshares. Similar to
// friend system - pending required

const User = require('../models/user');
const CarShare = require('../models/car-share');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
let token;
let userId;


function getTokenFromHttpRequest(req) {
  token = req.headers.authorization.replace('Bearer ', '');
  function retrieveUserIdFromToken(err, result) {
    userId = result.sub;
  }
  jwt.verify(token, secret, retrieveUserIdFromToken);
}



function passengerIndex(req, res, next) { //shows the passengers of the car
  //share user is currently on.
  CarShare
    .findById(req.params.carShareId)
    .populate('passengers pendingPassengers')
    .then(carShare => res.json(carShare))
    .catch(next);
}

// This is the user sending an passenger request. This adds that car share to the user's
// passenger to list, but the user only to the car shares's pending list until the
// organiser  accepts in the pendingPassengersController??

function passengerCreate(req, res, next) {
  const carShareId = req.params.carShareId;
  getTokenFromHttpRequest(req);
  User
    .findById(userId)
    .then(user => {
      user.carShares.push(carShareId);
      // console.log(user);
      return user.save();
    })
    .then(() => {
      return CarShare
        .findById(carShareId)
        .then(carShare => {
          carShare.pendingPassengers.push(userId);
          return carShare.save();
        });
    })
    .then((carShare) => res.json(carShare))
    .catch(next);
}

// cancelling passenger status, deletes from both existing and pending.
function passengerDelete(req, res, next) {
  const carShareId = req.params.carShareId;
  const passengerId = req.params.passengerId;
  User
    .findById(passengerId)
    .then(user => {
      user.carShares = user.carShares.filter(carShare =>  carShare.toString() !== carShareId);
      // console.log(user);
      return user.save();
    })
    .then(() => {
      CarShare
        .findById(carShareId)
        .then(carShare => {

          carShare.passengers = carShare.passengers.filter(passenger => passenger.toString() !== passengerId);

          carShare.pendingPassengers = carShare.pendingPassengers.filter(passenger => passenger.toString() !== passengerId);
          return carShare.save();
        });
    })
    .then((carShare) => res.sendStatus(204).json(carShare))
    .catch(next);
}


module.exports = {
  index: passengerIndex,
  delete: passengerDelete,
  create: passengerCreate
};
