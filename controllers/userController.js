const User = require('../models/user');

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .then(user => res.json(user))
    .catch(next);
}


function usersUpdate(req, res) {
  User
    .findById(req.params.id)
    .then(user => {
      if(!user) return res.status(401).json({ message: 'No user found'});

      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then(user => res.json(user))
    .catch(() => res.status(500).json({ message: 'Something went wrong'}));
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
