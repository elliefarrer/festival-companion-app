const mongoose = require('mongoose');

const festivalSchema = mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true},
  endDate: { type: Date, required: true},
  location: { type: String, required: true },
  camping: { type: String, required: true },
  Headlining: [{ type: String }],
  photoUrl: { type: String, required: true },
  organizer: [{ type: mongoose.schema.userId, ref: 'user.id' }]
});

module.exports= mongoose.model('Festival', festivalSchema);
