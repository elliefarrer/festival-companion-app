// if statement on front end will filter car shares according to the festival.

const CarShare = require('../models/car-share');
const User = require('../models/user');
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

function carSharesIndex(req, res, next) { //Only brings back carShares related to that festival.
  CarShare
    .find({festival: req.params.id})
    .populate('createdBy festival')
    .then(carShare => res.json(carShare))
    .catch(next);
}

function carSharesShow(req, res, next) {
  CarShare
    .findById(req.params.carShareId)
    .populate('createdBy festival')
    .then(carShare => res.json(carShare))
    .catch(next);
}

function carSharesCreate(req, res, next) {
  let carShareId;
  getTokenFromHttpRequest(req);
  req.body.createdBy = userId;
  req.body.festival = req.params.id;
  CarShare
    .create(req.body)
    .then(carShare => {
      carShareId = carShare.id;
      return User.findById(userId);
    })
    .then(user => {
      user.carSharesOrganised.push(carShareId);
      console.log(user);
      return user.save();
    })
    .then(() => CarShare.findById(carShareId))
    .then((carShare) => res.status(201).json(carShare))
    .catch(next);
}

function carSharesUpdate(req, res) {
  CarShare
    .findById(req.params.carShareId)
    .then(carShare => {
      if(!carShare) return res.status(401).json({ message: 'No carShare found'});

      for(const field in req.body) {
        carShare[field] = req.body[field];
      }

      return carShare.save();
    })
    .then(carShare => res.json(carShare))
    .catch(() => res.status(500).json({ message: 'Something went wrong'}));
}

function carSharesDelete(req, res, next) { // deletes from carSharesOrganised as well
  const carShareId = req.params.carShareId;
  let createdBy;
  CarShare
    .findById(req.params.carShareId)
    .then(carShare => {
      createdBy = carShare.createdBy;
      return carShare.remove();
    })
    .then(() => User.findById(createdBy))
    .then(user => {
      user.carSharesOrganised = user.carSharesOrganised.filter(id =>
        id.toString() !== carShareId
      );
      return user.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: carSharesIndex,
  show: carSharesShow,
  create: carSharesCreate,
  update: carSharesUpdate,
  delete: carSharesDelete
};
