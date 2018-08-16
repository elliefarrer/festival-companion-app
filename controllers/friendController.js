const Friend = require('../models/user');

function friendsIndex(req, res, next) {
  Friend
    .find()
    .then(friends => res.json(friends))
    .catch(next);
}

function friendsDelete(req, res, next) {
  Friend
    .findById(req.params.id)
    .then(friend => friend.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: friendsIndex,
  delete: friendsDelete
};
