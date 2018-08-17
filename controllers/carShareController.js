const CarShare = require('../models/car-share');

function carSharesIndex(req, res, next) {
  CarShare
    .find()
    .then(carShares => res.json(carShares))
    .catch(next);
}

function carSharesShow(req, res, next) {
  CarShare
    .findById(req.params.carShareId)
    .then(carShare => res.json(carShare))
    .catch(next);
}

function carSharesCreate(req, res, next) {
  CarShare
    .create(req.body)
    .then(carShare => res.status(201).json(carShare))
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

function carSharesDelete(req, res, next) {
  CarShare
    .findById(req.params.carShareId)
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
