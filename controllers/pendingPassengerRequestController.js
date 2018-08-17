const User = require('../models/user');
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


function pendingPassengersIndex(req, res, next) { //shows pending passengers for the users carShare
  User
    .findById(userId)
    .populate('carSharesOrganised')
    .then(user => res.json(user.carSharesOrganised.pendingPassengers)) //can change this to just carShares so that we can access event information too. Will need to populate! Maybe use carShare Model instead
    .catch(next);
}

// rejects the passenger request and deletes from pending list
function pendingPassengersDelete(req, res, next) {
  User
    .findById(userId)
    .populate('carSharesOrganised')
    .then(user => {
      user.carSharesOrganised.forEach(carShare => {
        if(carShare === req.params.carShareId) {
          carShare.pendingPassengers = carShare.pendingPassengers.filter(passenger => {
            passenger !== req.params.passengerId;
          });
        }
      }); //need to test
      return user.save();
    })
    .then(() => {
      return User
        .findById(req.params.friendId)
        .then(friend => {
          friend.friends = friend.friends.filter(friendId => {
            friendId !== userId;
            friend.save();
          }); //need to test if friendId === userId / may need toString().
        }); //could probably add this to the userSchema method
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: pendingPassengersIndex,
  delete: pendingPassengersDelete,
  getToken: getTokenFromHttpRequest
};
