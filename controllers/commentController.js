const CarShare = require('../models/car-share');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/environment');
let token;
let userId;

// This function draws the userId for the logged in user from the token - which
// we set in the authController.js. We can now refer to the 'posting user' in
// the comment.
// TODO:  Need to check if I even need to handle res or errors or just use this
// solely to get userId. If we can't get userId though, how would we handle this?
// make userId for comments required?


function getTokenFromHttpRequest(req) {
  token = req.headers.authorization.replace('Bearer ', '');
  function retrieveUserIdFromToken(err, result) {
    userId = result.sub;
  }
  jwt.verify(token, secret, retrieveUserIdFromToken);
}

///////////////////////////////////////////////////////////////////////////////

///which function runs first... is the userId saved for use?

function commentCreate(req, res, next) { // This needs testing
  getTokenFromHttpRequest(req);
  CarShare
    .findById(req.params.carShareId) //carShareId is from the params as per the routes.js.
    .then( carShare => {
      req.body.createdBy = userId;
      // console.log(req.body.createBy); //This needs testing
      carShare.comments.push(req.body);
      // console.log(carShare); // This needs testing
      console.log('Req body is', req.body);
      return carShare.save();
    })
    .then(carShare => res.json(carShare))
    .catch(next);
}

function commentDelete(req, res, next) {
  CarShare
    .findById(req.params.carShareId)
    .then(carShare => {
      carShare.comments = carShare.comments.filter(comment => {
        comment.id !== req.params.commentId;
      });
      return carShare.save();
    })
    .then(res => res.json())
    .catch(next);
}

// function commentUpdate(req, res, next) {
//   CarShare
//     .findById(req.params.carShareId)
//     .then({
//       req.body.comment = commentId;
//       carShare.comments.push(req.body);
//       return carShare.save();
//     })
//     .then(carShare => res.json(carShare))
//     .catch(next);
//   }

module.exports = {
  create: commentCreate,
  delete: commentDelete
  // update: commentUpdate
};
