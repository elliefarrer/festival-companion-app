const User = require('../models/user');

function usersIndex(req, res, next) {
  User
    .find()
    .populate({ path: 'festivalsAttending', populate: { path: 'attendees' }})
    .exec()
    .then(users => res.json(users))
    .catch(next);
}

function usersShow(req, res, next) {
  User
    .findById(req.params.id)
    .populate({ path: 'festivalsAttending', populate: { path: 'attendees' }})
    .populate('userFriends pendingFriends')
    .exec()
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
    .then(user => {
      // console.log('This is the User', user);
      user.remove();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete,
  index: usersIndex
};
