const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  profilePic: { type: String, required: true },
  lastName: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  mobileNumber: { type: Number, required: true },
  password: { type: String, required: true },
  passwordConfirmation: { type: String, required: true },
  userFriends: [{ type: mongoose.schema.ObjectId, ref: 'Users'}],
  pendingFriends: [{ type: mongoose.schema.ObjectId, ref: 'Users'}],
  carShare: [{ type: mongoose.schema.car, ref: 'carShares.id'}],
  carSharesOrganised: [{ type: mongoose.schema.ObjectId, ref: 'carShares.id'}],
  comments: [{ name: String, content: String, profilePic: String }]
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });


userSchema.pre('validate', function checkPassword(next) {
  if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
    this.invalidate('passwordConfirmation', 'does not match');
  }
  next();
});


userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
