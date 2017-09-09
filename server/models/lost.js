const mongoose = require('mongoose');
const _ = require('lodash');

var LostSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  description:{
    type: String,
    trim: true
  },
  creator:{
    type: String,
    required: true
  },
  status:{
    type: String,
    required: true
  }
});

var Lost = mongoose.model('Lost', LostSchema);

module.exports = {Lost};
