const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  examTitle: {
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
  },
  examDate: {
    type: String,
    required: true
  },
  examTime: {
    type: String,
    required: true
  },
  examFile: {
    type: String,
    required: true
  }
})

exports.Exam = mongoose.model('Exam', ExamSchema);

const UniversityExamSchema = new Schema({
  examTitle: {
    type: String,
    required: true
  },
  universityExamFile: {
    type: String,
    required: true
  }
})

exports.UniversityExam = mongoose.model('UniversityExam', UniversityExamSchema);