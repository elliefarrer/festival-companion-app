const User = require('../models/user');
const CarShare = require('../models/car-share');


// TODO: Put an if statement in that only shows this if you are the organiser
// front end or back end?

function pendingPassengersIndex(req, res, next) { //shows pending passengers for the carShare being observed
  CarShare
    .findById(req.params.carShareId)
    .populate('pendingPassengers')
    .then(carShare => {
      console.log(carShare);
      res.json(carShare.pendingPassengers);
    }) //can change this to just carShares so that we can access event information too. Will need to populate! Maybe use carShare Model instead
    .catch(next);
}

// rejects the passenger request and deletes from pending list
function pendingPassengersDelete(req, res, next) {
  const carShareId = req.params.carShareId;
  const passengerId = req.params.passengerId;
  CarShare
    .findById(carShareId)
    .then(carShare => {
      carShare.pendingPassengers = carShare.pendingPassengers.filter(pendingPassenger =>
        pendingPassenger.toString() !== passengerId
      );
      return carShare.save();
    })
    .then(() => User.findById(passengerId)) //This bit needs testing
    .then(rejectedPassenger => {
      console.log('the rejected passenger is', rejectedPassenger);
      rejectedPassenger.carShares = rejectedPassenger.carShares.filter(passengerOn =>
        passengerOn.toString() !== carShareId);
      return rejectedPassenger.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: pendingPassengersIndex,
  delete: pendingPassengersDelete
};
