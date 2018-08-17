// TODO: Not finished

// This controller will add and remove attendees from festivals. No pending required?

const User = require('../models/user');
const Festival = require('../models/festival');
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



function attendeeIndex(req, res, next) {
  Festival
    .findById(req.params.festivalId)
    .then(festival => res.json(festival.attendees))
    .catch(next);
}

// This is the user sending an attendee request. This adds that friend to the user's
// friend list, but the user only to the friend's pending list until they accept
// in the pendingFriendsController??

function attendeeCreate(req, res, next) {
  User
    .findById(userId)
    .then(user => {
      user.festivals.push(req.params.festivalId);
      return user.save();
    })
    .then(() => {
      return Festival
        .findById(req.params.festivalId)
        .then(festival => {
          festival.push(userId);
          festival.save();
        });
    })
    .then(() => {
      return User
        .findById(userId);
    })
    .then(user => res.json(user))
    .catch(next);
}


function attendeeDelete(req, res, next) {
  User
    .findById(userId)
    .then(user => {
      user.festival = user.festival.filter(festival => {
        festival !== req.params.festivalId;
      }); //need to test if friend === req.params.friendId / may need toString().
      return user.save();
    })
    .then(() => {
      return Festival
        .findById(req.params.festivalId)
        .then(festival => {
          festival.attendees = festival.attendees.filter(attendeeId => {
            attendeeId !== userId;
            festival.save();
          }); //need to test if friendId === userId / may need toString().
        }); //could probably add this to the userSchema method
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: attendeeIndex,
  delete: attendeeDelete,
  create: attendeeCreate,
  getToken: getTokenFromHttpRequest
};
