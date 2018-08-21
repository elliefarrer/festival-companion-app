const mongoose = require('mongoose');

const festivalSchema = mongoose.Schema({
  name: { type: String },
  startDate: { type: String},
  endDate: { type: String},
  location: {
    address: { type: String},
    postcode: { type: String}
  },
  camping: { type: String },
  markers: [{
    placeOfInterest: { type: String }, // put into Nominatim
    lat: Number, // get from Nominatim
    lng: Number
  }],
  headlining: [{ type: String }],
  photoUrl: { type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
  attendees: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  comments: [{ name: String, content: String }]
});

module.exports= mongoose.model('Festival', festivalSchema);
