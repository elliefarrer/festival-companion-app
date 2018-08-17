const User = require('../models/user');

function sessionsNew(req, res) {
  res.render('sessions/new');
}

function sessionsCreate(req, res) {
  User
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user || !user.validatePassword(req.body.password)) {
        res.status(401).render('sessions/new', { message: 'Please try again' });
      }
      // Login was successful
      req.flash('primary', `Welcome back ${user.firstName}`);
      req.session.userId = user.id;
      res.redirect('/');
    });
}

function sessionsDelete(req, res) {
  return req.session.regenerate(() => {
    req.flash('info', 'You have been logged out');
    res.redirect('/');
  });
}

module.exports = {
  new: sessionsNew,
  create: sessionsCreate,
  delete: sessionsDelete
};
