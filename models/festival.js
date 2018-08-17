const mongoose = require('mongoose');

const festivalSchema = mongoose.Schema({
  name: { type: String, required: true },
  startDate: { type: Date, required: true},
  endDate: { type: Date, required: true},
  location: { type: String, required: true },
  camping: { type: String, required: true },
  headlining: [{ type: String }],
  photoUrl: { type: String, required: true },
  createdBy: [{ type: mongoose.schema.ObjectId, ref: 'Users' }]
});

module.exports= mongoose.model('Festival', festivalSchema);
