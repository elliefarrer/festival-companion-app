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


function getTokenFromHttpRequest(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'No token sent'});
  }
  token = req.headers.authorization.replace('Bearer ', '');

  function retrieveUserIdFromToken(err, result) {
    if (err) {
      return res.status(401).json({ message: err});
    }
    userId = result.sub;
    return next();
  }
  jwt.verify(token, secret, retrieveUserIdFromToken);
}



function passengerIndex(req, res, next) { //shows the passengers of the car
  //share user is currently on.
  CarShare
    .findById(req.params.carShareId)
    .populate('passengers')
    .then(carShare => res.json(carShare.passengers))
    .catch(next);
}

// This is the user sending an passenger request. This adds that car share to the user's
// passenger to list, but the user only to the car shares's pending list until the
// organiser  accepts in the pendingPassengersController??

function passengerCreate(req, res, next) {
  User
    .findById(userId)
    .then(user => {
      user.carShares.push(req.params.carShareId);
      return user.save();
    })
    .then(() => {
      return CarShare
        .findById(req.params.carShareId)
        .then(carShare => {
          carShare.pendingPassengers.push(userId);
          return carShare.save();
        });
    })
    .then((carShare) => res.json(carShare.pendingPassengers))
    .catch(next);
}

// removing a passenger from the carShare (organiser only)
function passengerDelete(req, res, next) {
  User
    .findById(userId)
    .then(user => {
      user.carShare = user.carShare.filter(carShare => {
        carShare !== req.params.carShareId;
      }); //need to test if friend === req.params.friendId / may need toString().
      return user.save();
    })
    .then(() => {
      return CarShare
        .findById(req.params.carShareId)
        .then(carShare => {
          carShare.passengers = carShare.passengers.filter(passengerId => {
            passengerId !== userId;
            carShare.save();
          }); //need to test if friendId === userId / may need toString().
        }); //could probably add this to the userSchema method
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: passengerIndex,
  delete: passengerDelete,
  create: passengerCreate,
  getToken: getTokenFromHttpRequest
};
