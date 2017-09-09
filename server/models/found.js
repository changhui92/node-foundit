const mongoose = require('mongoose');
const _ = require('lodash');

var FoundSchema = new mongoose.Schema({
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

var Found = mongoose.model('Found', FoundSchema);

module.exports = {Found};
