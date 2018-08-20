const mongoose = require('mongoose');

const festivalSchema = mongoose.Schema({
  name: { type: String },
  startDate: { type: String},
  endDate: { type: String},
  location: { type: String},
  camping: { type: String},
  headlining: [{ type: String }],
  photoUrl: { type: String},
  createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

module.exports= mongoose.model('Festival', festivalSchema);
