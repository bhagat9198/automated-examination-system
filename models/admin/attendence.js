const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ClearAttendenceSchema = new Schema({
  branch: {
    type: String,
    required: true
  },
  sem: {
    type: String,
    required: true
  },
  clearAttendence: {
    type: String,
    required: true
  }
})

exports.ClearAttendence = mongoose.model('ClearAttendence', ClearAttendenceSchema);


const ShortageAttendenceSchema = new Schema({
  branch: {
    type: String,
    required: true
  },
  sem: {
    type: String,
    required: true
  },
  shortageAttendence: {
    type: String,
    required: true
  }
})

exports.ShortageAttendence = mongoose.model('ShortageAttendence', ShortageAttendenceSchema);