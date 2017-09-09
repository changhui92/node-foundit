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
  // faculty: {
  //   type: String,
  //   required: true
  // },
  // school: {
  //   type: String,
  //   required: true
  // },
  email:{
    type: String,
    required: true,
    unique: true
  },
  tokens:[{
    access:{
      type: String,
      required: true
    },
    token:{
      type: String,
      required: true
    }
  }]
});

// UserSchema.methods.toJSON = function() {
//   var user = this;
//   var userObject = user.toObject;
// 
//   return _.pick(userObject, ['_id','matric']);
// }

UserSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';

  var token = jwt.sign({email: user.email, access}, 'temp').toString();

  user.tokens.push({access, token});

  user.save().then(() => {
    return token;
  });
}


var User = mongoose.model('User', UserSchema);

module.exports = {User};
