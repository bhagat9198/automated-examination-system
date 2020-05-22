const path = require('path');
const fs = require('fs');

const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const UniversityExam = require('../models/admin/exam').UniversityExam;
const Exam = require('../models/admin/exam').Exam;
const ClearAttendence = require('../models/admin/attendence').ClearAttendence;
const ShortageAttendence = require('../models/admin/attendence').ShortageAttendence;
const rootDir = require('../util/path');
const Faculty = require('../models/admin/faculty');

exports.getApplyExam = (req, res, next) => {
  const exam_id = req.params.exam_id;
  // console.log(exam_id);
  let examDetail;
  Exam.findById(exam_id)
  .then(exam => {
    examDetail = exam;
    return Faculty.findById(req.session.user._id)
    .then(faculty => {
      faculty.examApply = exam;
      return faculty.save();
    });
  })
  .then(faculty => {
    // console.log(faculty);
    req.session.user = faculty;
    
    req.session.save(err => {
      if(err) {
        console.log(err);
      }
    })   
  })
  .then(data => {
    // console.log(examDetail);
    examDetail.facultyApplied.push(req.session.user.name);
    // console.log(examDetail.facultyApplied);
    
    examDetail.facultyRequire = examDetail.facultyRequire - 1;
    return examDetail.save();
  })
  .then(data => {

    return res.redirect('/faculty/home');
  })
  .catch(err => {
    console.log(err);
  });
};

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
  let successMessage = req.flash('success');
  if(successMessage.length > 0) {
    // console.log(errorMessage);
  } else {
    successMessage = null;
  }


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
    // console.log(req.session.user);
    
    let willApply = true;
    if(req.session.user.examApply) {
      willApply = false;
    }
   
    return res.render('faculty/home', {
      pageTitle: 'Faculty Dashboard',
      data: data,
      successMessage: successMessage,
      willApply: willApply
    });
  })
  .catch(err => {
    console.log(err);
  });
}

exports.getProfile = (req, res, next) => {
  let successMessage = req.flash('update');
  if(successMessage.length > 0) {
    successMessage = successMessage[0];
  } else {
    successMessage = null;
  }

  let errorMessage = req.flash('updateErr');
  if(errorMessage.length > 0) {
    errorMessage = errorMessage[0];
  } else {
    errorMessage = null;
  }

  return res.render('faculty/profile', {
    pageTitle: 'Profile |Faculty Dashboard',
    successMessage: successMessage,
    errorMessage: errorMessage,
    user: req.session.user
  });
};

exports.postUpdatePassword = (req, res, next) => {
  const user_id = req.body._id;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  // console.log(email, password, cpassword);

  Faculty.findById(user_id)
  .then(user => {
    if(user) {
      if(password === cpassword) {
        bcryptjs.hash(password, 12) 
        .then(hashedPassword => {
          user.password = hashedPassword;
          return user.save();
        })
        .then(user => {
          req.session.user = user;
          req.session.save(err => {
            if(err) {
              console.log(err);
            }
            req.flash('update', 'Your password has been updated');
            return res.redirect('/faculty/profile');
          })
        })
      } else {
        // console.log('New password and confirm password didnt match');
        req.flash('updateErr', 'New password and confirm password didnt match');
        return res.redirect('/faculty/profile');
      } 
    } else {
      // console.log('Invalid User');
      req.flash('updateErr', 'Invalid User');
      return res.redirect('/faculty/profile');
    }
    
  })
  .catch(err => {
    console.log(err);
  });
}; 

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
};

exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      console.log(err);
    }
    return res.redirect('/');
  });
};