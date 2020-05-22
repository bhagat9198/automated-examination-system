const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const FacultySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  examApply: {
    type: Object
  }
})

module.exports = mongoose.model('Faculty', FacultySchema);