const mongoose = require('mongoose');

const carShareSchema = mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  festival: { type: mongoose.Schema.ObjectId, ref: 'Festival' },
  festivalStartDate: { type: mongoose.Schema.ObjectId, ref: 'Festival' },
  festivalEndDate: { type: mongoose.Schema.ObjectId, ref: 'Festival' },
  rideStartTime: { type: String, required: true },
  from: {
    postcode: { type: String, required: true },
    lat: Number,
    lng: Number
  },
  to: {
    postcode: { type: String, required: true },
    lat: Number,
    lng: Number
  },
  stopPoints: [{
    passengerName: String,
    arrangedTime: String,
    postcode: String,
    lat: Number,
    lng: Number
  }],
  price: Number,
  totalSeats: { type: Number, required: true },
  numOfPassengers: { type: Number, required: true },
  passengerNames: [{ type: String }],
  comments: [{
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    content: String,
    timeStamp: String
  }]
});

module.exports = mongoose.model('CarShare', carShareSchema);
