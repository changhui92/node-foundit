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
  }
});

var Found = mongoose.model('Found', FoundSchema);

module.exports = {Found};
