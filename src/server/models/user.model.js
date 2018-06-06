const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  firstName: String,
  lastName: String,
  phone: String,
  email: String,
  role: String,
  dateOfBirth: Date,
});

const UserModel = mongoose.model('UserModel', UserSchema);

module.exports = UserModel;
