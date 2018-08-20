const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  firstName: { type: String },
  profilePic: { type: String },
  lastName: { type: String },
  userName: { type: String },
  email: { type: String },
  mobileNumber: { type: String },
  password: { type: String },
  userFriends: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  pendingFriends: [{ type: mongoose.Schema.ObjectId, ref: 'User'}],
  carShares: [{ type: mongoose.Schema.ObjectId, ref: 'CarShare'}],
  carSharesOrganised: [{ type: mongoose.Schema.ObjectId, ref: 'CarShare'}],
  comments: [{ name: String, content: String, profilePic: String }]
});

userSchema
  .virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });


userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password')) { // Added this to get past validation on save user.
    if(!this._passwordConfirmation || this._passwordConfirmation !== this.password) {
      this.invalidate('passwordConfirmation', 'does not match');
    }
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
