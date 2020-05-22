const fs = require('fs');
const path = require('path');

const mongoose = require('mongoose');
const uniqid = require('uniqid');
const PdfPrinter = require('pdfmake');
const bcryptjs = require('bcryptjs');

const Student = require('../models/admin/student');
const Faculty = require('../models/admin/faculty');
const Exam = require('../models/admin/exam').Exam;
const ClearAttendence = require('../models/admin/attendence').ClearAttendence;
const ShortageAttendence = require('../models/admin/attendence').ShortageAttendence;
const UniversityExam = require('../models/admin/exam').UniversityExam;
const AddAdmin = require('../models/admin/profile').AddAdmin;

exports.getAddExam = (req, res, next) => {
  Exam.find()
  .then(exams => {
    console.log(exams);
    res.render('admin/add-exam', {
      pageTitle: 'Add Exam |Admin Dashboard',
      exams: exams
    });
  })
};

exports.postAddExam = (req, res, next) => {
  const examTitle = req.body.examTitle;
  const branch = req.body.branch;
  const sem = req.body.sem;
  const examDate = req.body.examDate;
  const examTime = req.body.examTime;

  const examFile = 'E' + '_' + uniqid()+'.pdf'; 

  function pdfCreation(fileName){
    var fonts = {
      Roboto: {
        normal: './public/fonts/Roboto-Regular.ttf',
        bold: './public/fonts/Roboto-Medium.ttf',
        italics: './public/fonts/Roboto-Italic.ttf',
        bolditalics: './public/fonts/Roboto-MediumItalic.ttf'
      }
    };

    var docDefinition = {
      content: [
        { text: 'Exam Details', style: 'header' },
        { text: '.', style: 'space' },
        { text: 'Exam Title   :  ' + examTitle, style: 'anotherStyle' },
        { text: '.', style: 'space1' },
        { text: 'Branch   :   ' + branch, style: 'anotherStyle' },
        { text: '.', style: 'space1' },
        { text: 'Semester   :   ' + sem, style: 'anotherStyle' },
        { text: '.', style: 'space1' },
        { text: 'Exam Date    :   ' + examDate, style: 'anotherStyle' },
        { text: '.', style: 'space1' },
        { text: 'Exam Time    :   ' + examTime, style: 'anotherStyle' },
      ],
      styles: {
        header: {
          fontSize: 30,
          bold: true,
        },
        space: {
          lineHeight: 2,
          color: 'white'
        },
        space1: {
          lineHeight: 1.5,
          color: 'white'
        },
        anotherStyle: {
          fontSize: 18,
          italics: true,
          alignment: 'left'
        }
      }
    };

    var printer = new PdfPrinter(fonts);
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('./data/exam/'+ examFile));
    pdfDoc.end();
  }

  const exam = new Exam({
    examTitle: examTitle,
    branch: branch,
    sem: sem,
    examDate: examDate,
    examTime: examTime,
    examFile: examFile,
    facultyRequire: 10
  });

  exam.save()
  .then(result => {
    pdfCreation(examFile);
    res.redirect('/admin/add-exam');
  })
  .catch(err => console.log(err));
};

exports.postDeleteExam = (req, res, next) => {
  const exam_id = req.body.exam_id;

  Exam.findByIdAndDelete(exam_id)
  .then(result => {
    res.redirect('/admin/add-exam');
  })
  .catch(err => console.log(err));
}

exports.getAddFaculty = (req, res, next) => {
  let errorMessage = req.flash('error');
  if(errorMessage.length > 0) {
    // console.log(errorMessage);
  } else {
    errorMessage = null;
  }

  let successMessage = req.flash('success');
  if(successMessage.length > 0) {
    // console.log(errorMessage);
  } else {
    successMessage = null;
  }

  return res.render('admin/add-faculty', {
    pageTitle: 'Add Faculty |Admin Dashboard',
    errorMessage: errorMessage,
    successMessage: successMessage
  });
};

exports.postAddFaculty = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  Faculty.findOne({email: email})
  .then(faculty => {
    if(faculty) {
      res.redirect('/faculty/add-faculty')
    } else {
      if(password === cpassword) {
        bcryptjs.hash(password, 12)
        .then(hashedPassword => {
          const faculty = new Faculty({
            name: name,
            email: email,
            password: hashedPassword,
            examApply: {}
          });
          return faculty.save()
          .then(result => {
            req.flash('success','Faculty record successfully');
            return res.redirect('/admin/add-faculty');
          })
          .catch(err => console.log(err));
        })
      } else {
        req.flash('error','Password and confirm password didnt match');
        return res.redirect('/admin/add-faculty');
      }
    }
  })
  
};

exports.getAddStudent = (req, res, next) => {
  let errorMessage = req.flash('error');
  if(errorMessage.length > 0) {
    // console.log(errorMessage);
  } else {
    errorMessage = null;
  }

  let successMessage = req.flash('success');
  if(successMessage.length > 0) {
    // console.log(errorMessage);
  } else {
    successMessage = null;
  }

  return res.render('admin/add-student', {
    pageTitle: 'Add Student |Admin Dashboard',
    errorMessage: errorMessage,
    successMessage: successMessage
  });
};

exports.postAddStudent = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  const usn = req.body.usn;
  const branch = req.body.branch;
  const sem = req.body.sem;

  Student.findOne({email: email})
  .then(user => {
    if(user) {
      req.flash('error','Email already present');
      return res.redirect('/admin/add-student');
    } else {
      if(password === cpassword) {
        bcryptjs.hash(password,12)
        .then(hashedPassword => {
          const student = new Student({
            name: name,
            email: email,
            password: hashedPassword,
            usn: usn,
            branch: branch,
            sem: sem
          });
          return student.save()
        })
        .then(result => {
          req.flash('success','Student record successfully');
          res.redirect('/admin/add-student');
        })
      } else {
        // console.log('Password and confirm password didnt match');
        req.flash('error','Password and confirm password didnt match');
        return res.redirect('/admin/add-student')
      }
    }
  })
  .catch(err => console.log(err));
};

exports.getClearAttendence = (req, res, next) => {
  ClearAttendence.find()
  .then(clearAttendence => {
    res.render('admin/clear-attendence', {
      pageTitle: 'Clear Attendence |Admin Dashboard',
      clearAttendence: clearAttendence
    });
  })
};

exports.getDeleteClearAttendence = (req, res, next) => {
  cAttendence_id = req.params.cAttendence_id;
  // console.log(cAttendence_id);
  ClearAttendence.deleteOne({'_id': mongoose.Types.ObjectId(cAttendence_id)})
  .then(result => {
    res.redirect('/admin/clear-attendence');
  })
  .catch(err => console.log(err));
};

exports.postClearAttendence = (req, res, next) => {
  const branch = req.body.branch;
  const sem = req.body.sem;
  const clearAttendence = req.file;
  const clearAttendenceUrl = clearAttendence.path;
  // console.log(clearAttendence);
  
  const cAttendence = new ClearAttendence({
    branch: branch,
    sem: sem,
    clearAttendence: clearAttendenceUrl
  });

  cAttendence.save()
  .then(result => {
    res.redirect('/admin/clear-attendence')
  })
  .catch(err => console.log(err));
};

exports.getGeneratePlans = (req, res, next) => {
  return res.render('admin/generate-plans', {
    pageTitle: 'Generate Plans |Admin Dashboard'
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

  Student.find()
  .then(students => {
    data.totalStudents = students.length;
    return data;
  })
  .then(data => {
    return Faculty.find()
    .then(faculties => {
      data.totalFaculties = faculties.length;
      return data;
    });
  })
  .then(data => {
    return Exam.find()
    .then(exams => {
      data.totalExams = exams.length;
      return data;
    });
  })
  .then(data => {
    return UniversityExam.find()
    .then(uexams => {
      data.totalUniversityExams = uexams.length;
      return data;
    });
  })
  .then(data => {
    // console.log(data);
    return res.render('admin/home', {
      pageTitle: 'Admin Dashboard',
      successMessage: successMessage,
      data: data
    });
  })
};

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

  AddAdmin.find()
  .then(admins => {
    res.render('admin/profile', {
      pageTitle: 'Profile |Admin Dashboard',
      admins: admins,
      user: req.session.user,
      successMessage: successMessage,
      errorMessage: errorMessage
    });
  });
};

exports.postUpdatePassword = (req, res, next) => {
  const user_id = req.body._id;
  const password = req.body.password;
  const cpassword = req.body.cpassword;
  // console.log(email, password, cpassword);

  AddAdmin.findById(user_id)
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
          req.flash('update', 'Your password has been updated');
          req.session.save(err => {
            if(err) {
              console.log(err);
            }
            return res.redirect('/admin/profile');
          })
        })
      } else {
        // console.log('New password and confirm password didnt match');
        req.flash('updateErr', 'New password and confirm password didnt match');
        return res.redirect('/admin/profile');
      } 
    } else {
      // console.log('Invalid User');
      req.flash('updateErr', 'Invalid User');
      return res.redirect('/admin/profile');
    }
    
  })
  .catch(err => {
    console.log(err);
  });
}; 

exports.getDeleteAdmin = (req, res, next) => {
  const admin_id = req.params.admin_id;

  AddAdmin.deleteOne({'_id': mongoose.Types.ObjectId(admin_id)})
  .then(result => {
    res.redirect('/admin/profile');
  })
  .catch(err => console.log(err));
}

exports.postProfile = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  AddAdmin.findOne({email: email})
  .then(user => {
    if(user) {
      console.log('Email already prsent');
    } else {
      if(password === cpassword) {
        bcryptjs.hash(password, 12)
        .then(hashedPassword => {
          const addAdmin = new AddAdmin({
            name: name,
            email: email,
            password: hashedPassword
          });
          return addAdmin.save();
        })
        .then(result => {
          console.log('Admin added');
          return res.redirect('/admin/profile');
        })
      } else {
        console.log('Password and confirm didnt match');
      }
    }
  })
  .catch(err => console.log(err));
};

exports.getShortageAttendence = (req, res, next) => {
  ShortageAttendence.find()
  .then(shortageAttendence => {
    res.render('admin/shortage-attendence', {
      pageTitle: 'Shortage Attendence |Admin Dashboard',
      shortageAttendence: shortageAttendence
    });
  })
};

exports.getDeleteShortageAttendence = (req, res, next) => {
  sAttendence_id = req.params.sAttendence_id;
  // console.log(sAttendence_id);
   ShortageAttendence.deleteOne({'_id': mongoose.Types.ObjectId(sAttendence_id)})
  .then(result => {
    res.redirect('/admin/shortage-attendence');
  })
  .catch(err => console.log(err));
};

exports.postShortageAttendence = (req, res, next) => {
  const branch = req.body.branch;
  const sem = req.body.sem;
  const shortageAttendence = req.file;
  const shortageAttendenceUrl = shortageAttendence.path;
  // console.log(shortageAttendence);
  
  const sAttendence = new ShortageAttendence({
    branch: branch,
    sem: sem,
    shortageAttendence: shortageAttendenceUrl
  });

  sAttendence.save()
  .then(result => {
    res.redirect('/admin/shortage-attendence')
  })
  .catch(err => console.log(err));
};


exports.getUniversityExam = (req, res, next) => {
  UniversityExam.find()
  .then(universityExams => {
    res.render('admin/university-exam', {
      pageTitle: 'University Exam |Admin Dashboard',
      universityExams: universityExams
    });
  })
};

exports.getDeleteUniversityExam = (req, res, next) => {
  universityExam_id = req.params.universityExam_id;
  // console.log(universityExam_id);
   UniversityExam.deleteOne({'_id': mongoose.Types.ObjectId(universityExam_id)})
  .then(result => {
    res.redirect('/admin/university-exam');
  })
  .catch(err => console.log(err));
};

exports.postUniversityExam = (req, res, next) => {
  const examTitle = req.body.examTitle;
  const universityExamFile = req.file;
  const universityExamFileUrl = universityExamFile.path;
  // console.log(universityExamFile);
  
  const universityExam = new UniversityExam({
    examTitle: examTitle,
    universityExamFile: universityExamFileUrl
  });

  universityExam.save()
  .then(result => {
    res.redirect('/admin/university-exam');
  })
  .catch(err => console.log(err));
};

exports.getViewExam = (req, res, next) => {
  Exam.find()
  .then(exams => {
    // console.log(exams);
    res.render('admin/view-exam', {
      pageTitle: 'View Exam |Admin Dashboard',
      exams: exams
    });
  })
  .catch(err => console.log(err));
};

exports.getExamTimeTable = (req, res, next) => {
  const exam_id = req.params.exam_id;
  // console.log(exam_id);
  
  Exam.findById(mongoose.Types.ObjectId(exam_id))
  .then(examDetails => {
    // console.log(examDetails);

    const rootDir = require('../util/path');
    const fileName = examDetails.examFile;
    const filePath = path.join(rootDir, 'data', 'exam',fileName);
    fs.readFile(filePath, (err, data) => {
      if(err) {
        console.log(err);
      }
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','attachment; filename = "'+ fileName +'"'); 
      res.send(data);
    });
  });
};

exports.getViewFaculty = (req, res, next) => {
  Faculty.find()
  .then(faculties => {
    res.render('admin/view-faculty', {
      pageTitle: 'View Faculty |Admin Dashboard',
      faculties: faculties
    });
  })
  .catch(err => console.log(err));
};

exports.postUpdateFaculty = (req, res, next) => {
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const faculty_id = req.body.faculty_id;

  Faculty.findById(faculty_id)
  .then(faculty => {
    faculty.name = updatedName;
    faculty.email = updatedEmail;

    return faculty.save()
  })
  .then(result => {
    return res.redirect('/admin/view-faculty');
  })
  .catch(err => console.log(err));
};

exports.getDeleteFaculty = (req, res, next) => {
  const faculty_id = req.params.faculty_id;

  Faculty.deleteOne({_id: mongoose.Types.ObjectId(faculty_id)})
  .then(result => {
    res.redirect('/admin/view-faculty');
  })
  .catch(err => console.log(err));
};

exports.getViewStudent = (req, res, next) => {
  Student.find()
  .then(students => {
    res.render('admin/view-student', {
      pageTitle: 'View Student |Admin Dashboard',
      students: students
    });
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postUpdateStudent =(req, res, next) => {
  const updatedName = req.body.name;
  const updatedEmail = req.body.email;
  const updatedUsn = req.body.usn;
  const updatedBranch = req.body.branch;
  const updatedSem = req.body.sem;
  const student_id = req.body.student_id;

  Student.findById(student_id)
  .then(student => {
    student.name =  updatedName;
    student.email = updatedEmail;
    student.usn = updatedUsn;
    student.branch = updatedBranch;
    student.sem = updatedSem;

    return student.save();
  })
  .then(result => {
    return res.redirect('/admin/view-student');
  })
  .catch(err => console.log(err));
};

exports.getDeleteStudent = (req, res, next) => {
  const student_id = req.params.student_id;
  Student.deleteOne({ _id: mongoose.Types.ObjectId(student_id)})
  .then(result => {
    res.redirect('/admin/view-student');
  })
  .catch(err => console.log(err));
}

exports.getLogout = (req, res, next) => {
  req.session.destroy(err => {
    if(err) {
      console.log(err);
    }
    return res.redirect('/');
  });
};
