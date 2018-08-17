const User = require('../models/user');

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}


function usersUpdate(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .catch(next);
}


function usersDelete(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete
};
