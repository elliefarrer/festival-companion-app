const Festival = require('../models/festival');

function markerCreate(req, res, next) {
  // console.log('req params is', req.params);
  const festivalId = req.params.id;
  Festival
    .findById(festivalId)
    .then(festival => {
      festival.markers.push(festivalId);
    })
    .then(festival => res.json(festival))
    .catch(next);
}

module.exports = {
  create: markerCreate
};
