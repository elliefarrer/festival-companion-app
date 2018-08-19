const mongoose = require('mongoose');

const carShareSchema = mongoose.Schema({
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  festival: { type: mongoose.Schema.ObjectId, ref: 'Festival' },
  rideStartTime: { type: String },
  estimatedRideEndTime: { type: String }, // get from MapQuest/Direction API
  from: {
    postcode: { type: String }, // put into Nominatim
    lat: Number, // get from Nominatim
    lng: Number  // get from Nominatim
  },
  to: {
    postcode: { type: String }, // put into Nominatim
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
  totalSeats: { type: Number},
  passengers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }
  ],
  pendingPassengers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }
  ],
  comments: [{
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    content: String,
    timeStamps: String
  }],
  timeStamps: String
});

carShareSchema.virtual('seatsRemaining')
  .get(function() {
    return this.totalSeats - this.passengers.length;
  });


module.exports = mongoose.model('CarShare', carShareSchema);
