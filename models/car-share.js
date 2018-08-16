const mongoose = require('mongoose');

const carShareSchema = mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  festival: { type: mongoose.Schema.ObjectId, ref: 'Festival' },
  festivalStartDate: { type: mongoose.Schema.ObjectId, ref: 'Festival' },
  festivalEndDate: { type: mongoose.Schema.ObjectId, ref: 'Festival' },
  rideStartTime: { type: String, required: true },
  estimatedRideEndTime: { type: String, required: true }, // get from MapQuest/Direction API
  from: {
    postcode: { type: String, required: true }, // put into Nominatim
    lat: Number, // get from Nominatim
    lng: Number  // get from Nominatim
  },
  to: {
    postcode: { type: String, required: true }, // put into Nominatim
    lat: Number, // get from Nominatim
    lng: Number // get from Nominatim
  },
  stopPoints: [{
    passengerName: String,
    arrangedTime: String,
    postcode: String, // put into Nominatim
    lat: Number, // get from Nominatim
    lng: Number // get from Nominatim
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

carShareSchema.virtual('seatsRemaining')
  .get(function() {
    return this.totalSeats - this.numOfPassengers;
  });


module.exports = mongoose.model('CarShare', carShareSchema);
