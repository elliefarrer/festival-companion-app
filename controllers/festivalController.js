const Festival = require('../models/festival');

function festivalsIndex(req, res, next) {
  Festival
    .find()
    .then(festivals => res.json(festivals))
    .catch(next);
}

function festivalsShow(req, res, next) {
  Festival
    .findById(req.params.id)
    .then(festival => res.json(festival))
    .catch(next);
}

function festivalsCreate(req, res, next) {
  Festival
    .create(req.body)
    .then(festival => res.status(201).json(festival))
    .catch(next);
}

function festivalsUpdate(req, res) {
  Festival
    .findById(req.params.id)
    .then(festival => {
      if(!festival) return res.status(401).json({ message: 'No festival found'});

      for(const field in req.body) {
        festival[field] = req.body[field];
      }

      return festival.save();
    })
    .then(festival => res.json(festival))
    .catch(() => res.status(500).json({ message: 'Something went wrong'}));
}

function festivalsDelete(req, res, next) {
  Festival
    .findById(req.params.id)
    .then(festival => festival.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: festivalsIndex,
  show: festivalsShow,
  create: festivalsCreate,
  update: festivalsUpdate,
  delete: festivalsDelete
};
