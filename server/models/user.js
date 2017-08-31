const mongoose = require('mongoose');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  matric: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 1
  },
  password: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 6
  },
  faculty: {
    type: String,
    required: true
  },
  school: {
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  }
});

UserSchema.methods.toJSON = function() {
  var user = this;
  var userObject = user.toObject;

  return _.pick(userObject, ['_id','matric']);
}

var User = mongoose.model('User', UserSchema);

module.exports = {User};
