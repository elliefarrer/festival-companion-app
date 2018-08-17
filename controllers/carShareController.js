const CarShare = require('../models/car-share');

function carSharesIndex(req, res, next) {
  CarShare
    .find()
    .then(carShares => res.json(carShares))
    .catch(next);
}

function carSharesShow(req, res, next) {
  CarShare
    .findById(req.params.id)
    .then(carShare => res.json(carShare))
    .catch(next);
}

function carSharesCreate(req, res, next) {
  CarShare
    .create(req.body)
    .then(carShare => res.status(201).json(carShare))
    .catch(next);
}

function carSharesUpdate(req, res, next) {
  CarShare
    .findById(req.params.id)
    .then(carShare => carShare.set(req.body))
    .then(carShare => carShare.save())
    .catch(next);
}

function carSharesDelete(req, res, next) {
  CarShare
    .findById(req.params.id)
    .then(carShare => carShare.remove())
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
