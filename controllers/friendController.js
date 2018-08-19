// TODO: change create to send friend info

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
let token;
let userId;


function getTokenFromHttpRequest(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'No token sent'});
  }
  token = req.headers.authorization.replace('Bearer ', '');

  function retrieveUserIdFromToken(err, result) {
    if (err) {
      return res.status(401).json({ message: err});
    }
    userId = result.sub;
    return next();
  }
  jwt.verify(token, secret, retrieveUserIdFromToken);
}



function friendsIndex(req, res, next) {
  User
    .findById(userId)
    .then(user => res.json(user.friends))
    .catch(next);
}

// This is the user sending a friend request. This adds that friend to the user's
// friend list, but the user only to the friend's pending list until they accept
// in the pendingFriendsController??

function friendsCreate(req, res, next) {
  User
    .findById(userId)
    .then(user => {
      user.friends.push(req.params.friendId);
      return user.save();
    })
    .then(() => {
      return User
        .findById(req.params.friendId)
        .then(friend => {
          friend.pendingFriends.push(userId);
          friend.save();
        });
    })
    .then(() => {
      return User
        .findById(req.params.friendId);
    })
    .then(user => res.json(user))
    .catch(next);
}


function friendsDelete(req, res, next) {
  User
    .findById(userId)
    .then(user => {
      user.friends = user.friends.filter(friend => {
        friend !== req.params.friendId;
      }); //need to test if friend === req.params.friendId / may need toString().
      return user.save();
    })
    .then(() => {
      return User
        .findById(req.params.friendId)
        .then(friend => {
          friend.friends = friend.friends.filter(friendId => {
            friendId !== userId;
            friend.save();
          }); //need to test if friendId === userId / may need toString().
        }); //could probably add this to the userSchema method
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: friendsIndex,
  delete: friendsDelete,
  create: friendsCreate,
  getToken: getTokenFromHttpRequest
};
