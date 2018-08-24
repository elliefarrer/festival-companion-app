// TODO: Not finished

// This controller will add and remove attendees from festivals. No pending required?

const User = require('../models/user');
const Festival = require('../models/festival');
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




function attendeeIndex(req, res, next) {
  Festival
    .findById(req.params.festivalId)
    .populate('attendees')
    .then(festival => res.json(festival))
    .catch(next);
}


function attendeeCreate(req, res, next) {
  // console.log('we are in attendee Create');
  getTokenFromHttpRequest(req);
  const festivalId = req.params.festivalId;
  User
    .findById(userId)
    .then(user => {
      user.festivalsAttending = [].concat(...user.festivalsAttending, festivalId);
      return user.save();
    })
    .then(() => Festival.findById(festivalId))
    .then(festival => {
      festival.attendees.push(userId);
      return festival.save();
    })
    .then(() => User.findById(userId))
    .then(user => res.json(user))
    .catch(next);
}


function attendeeDelete(req, res, next) {
  getTokenFromHttpRequest(req);
  const festivalId = req.params.festivalId;
  User
    .findById(userId)
    .then(user => {
      user.festivalsAttending = user.festivalsAttending.filter(festival =>
        festival.toString() !== festivalId);
      return user.save();
    })
    .then(() => Festival.findById(festivalId))
    .then(festival => {
      festival.attendees = festival.attendees.filter(attendeeId => {
        attendeeId.toString() !== userId;
        festival.save();
      });
    })
    .then(() => User.findById(userId))
    .then(user => res.json(user))
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: attendeeIndex,
  delete: attendeeDelete,
  create: attendeeCreate
};
