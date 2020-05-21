const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');

const UniversityExam = require('../models/admin/exam').UniversityExam;
const Exam = require('../models/admin/exam').Exam;
const ClearAttendence = require('../models/admin/attendence').ClearAttendence;
const ShortageAttendence = require('../models/admin/attendence').ShortageAttendence;
const rootDir = require('../util/path');

exports.getApplyExam = (req, res, next) => {
  return;
}

exports.getDownloadUniversityExams = (req, res, next) => {
  const universityExam_id = req.params.universityExam_id;
  console.log(universityExam_id);
  
  UniversityExam.findById(universityExam_id)
  .then(universityExamDetails => {
    // console.log(universityExamDetails);
    
    const filePath = universityExamDetails.universityExamFile;
    const fileName = filePath.substring(41,);
    const fullFilePath = path.join(rootDir, filePath);
    fs.readFile(fullFilePath, (err, data) => {
      if(err) {
        console.log(err);
      }
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','attachment; filename = "'+ fileName +'"'); 
      res.send(data);
    });
  })
  .catch(err => {
    console.log(err);
  })
};

exports.getClearAttendence = (req, res, next) => {
  ClearAttendence.find()
  .then(clearAttendence => {
    return res.render('faculty/clear-attendence', {
      pageTitle: 'Clear Attendence |Faculty Dashboard',
      clearAttendence: clearAttendence
    });
  });
};

exports.getDownloadClearAttendence = (req, res, next) => {
  const clearAttendence_id = req.params.clearAttendence_id;
  // console.log(clearAttendence_id);
  
  ClearAttendence.findById(mongoose.Types.ObjectId(clearAttendence_id))
  .then(clearAttendenceDetails => {
    // console.log(clearAttendenceDetails);

    const fileName = clearAttendenceDetails.clearAttendence;
    const filePath = path.join(rootDir, fileName);
    fs.readFile(filePath, (err, data) => {
      if(err) {
        console.log(err);
      }
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','attachment; filename = "'+ fileName +'"'); 
      res.send(data);
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.getHome = (req, res, next) => {
  let data = {};
  Exam.find()
  .then(exams => {
    data.exams = exams;
    return data;
  })
  .then(data => {
    return UniversityExam.find()
    .then(universityExams => {
      data.universityExams = universityExams;
      return data;
    });
  })
  .then(data => {
    // console.log(data);
   
    return res.render('faculty/home', {
      pageTitle: 'Faculty Dashboard',
      data: data
    });
  })
  .catch(err => {
    console.log(err);
  });
}

exports.getProfile = (req, res, next) => {
  return res.render('faculty/profile', {
    pageTitle: 'Profile |Faculty Dashboard'
  });
}

exports.getShortageAttendence = (req, res, next) => {
  ShortageAttendence.find()
  .then(shortageAttendence => {
    return res.render('faculty/shortage-attendence', {
      pageTitle: 'Shortage Attendence |Faculty Dashboard',
      shortageAttendence: shortageAttendence
    });
  });
};

exports.getDownloadShortageAttendence = (req, res, next) => {
  const shortageAttendence_id = req.params.shortageAttendence_id;
  // console.log(shortageAttendence_id);
  
  ShortageAttendence.findById(mongoose.Types.ObjectId(shortageAttendence_id))
  .then(shortageAttendenceDetails => {
    // console.log(shortageAttendenceDetails);

    const fileName = shortageAttendenceDetails.shortageAttendence;
    const filePath = path.join(rootDir, fileName);
    fs.readFile(filePath, (err, data) => {
      if(err) {
        console.log(err);
      }
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','attachment; filename = "'+ fileName +'"'); 
      res.send(data);
    });
  })
  .catch(err => {
    console.log(err);
  });
}