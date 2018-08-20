// TODO: change create to send friend info

const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
let token;
let userId;


function getTokenFromHttpRequest(req) {
  token = req.headers.authorization.replace('Bearer ', '');
  function retrieveUserIdFromToken(err, result) {
    userId = result.sub;
  }
  jwt.verify(token, secret, retrieveUserIdFromToken);
}



function friendsIndex(req, res, next) {
  getTokenFromHttpRequest(req);
  User
    .findById(userId)
    .populate('userFriends')
    .then(user => res.json(user.userFriends))
    .catch(next);
}

// This is the user sending a friend request. This adds that friend to the user's
// friend list, but the user only to the friend's pending list until they accept
// in the pendingFriendsController??

function friendsCreate(req, res, next) {
  getTokenFromHttpRequest(req);
  const friendId = req.params.friendId;
  User
    .findById(userId)
    .then(user => {
      user.userFriends.push(friendId);
      console.log('this is the user', user);
      return user.save();
    })
    .then(() => User.findById(friendId))
    .then(friend => {
      friend.pendingFriends.push(userId);
      console.log('this is the friend', friend);
      return friend.save();
    })
    .then(pendingFriend => res.status(201).json(pendingFriend))
    .catch(next);
}

// Unfriending someone, removes from their friend and pending also.

function friendsDelete(req, res, next) {
  getTokenFromHttpRequest(req);
  const friendId = req.params.friendId;
  User
    .findById(userId)
    .then(user => {
      user.userFriends = user.userFriends.filter(friend =>
        friend.toString() !== friendId
      );
      return user.save();
    })
    .then(() => User.findById(friendId))
    .then(friend => {
      friend.userFriends = friend.userFriends.filter(unfriendId =>
        unfriendId.toString() !== userId);
      friend.pendingFriends = friend.pendingFriends.filter(unfriendId =>
        unfriendId.toString() !== userId);
      return friend.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: friendsIndex,
  delete: friendsDelete,
  create: friendsCreate
};
