const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
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
  usn: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  sem: {
    type: String,
    required: true
  }
})


module.exports = mongoose.model('Student', StudentSchema);

