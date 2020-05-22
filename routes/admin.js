
const express = require('express');
const multer = require('multer');
const uniqid = require('uniqid');

const router = express.Router();

const adminController = require('../controller/admin');
const adminLoggedIn = require('../middleware/loggedIn').adminLoggedIn;

const fileStorage1 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'data/clearAttendence');
  },
  filename: function(req, file, cb) {
    cb(null, 'C' + '_'+ uniqid()+'-' + file.originalname);
  }
});

const fileFilter1 = (req, file, cb) => {
  if(file.mimetype === 'application/pdf') 
  {
    cb(null, true);
  } else {
    cb(null, false)
  }
}

const fileStorage2 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'data/shortageAttendence');
  },
  filename: function(req, file, cb) {
    cb(null, 'S' + '_'+ uniqid()+'-' + file.originalname);
  }
});

const fileFilter2 = (req, file, cb) => {
  if(file.mimetype === 'application/pdf') 
  {
    cb(null, true);
  } else {
    cb(null, false)
  }
}

const fileStorage3 = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'data/universityExam');
  },
  filename: function(req, file, cb) {
    cb(null, 'U' + '_'+ uniqid()+'-' + file.originalname);
  }
});

const fileFilter3 = (req, file, cb) => {
  if(file.mimetype === 'application/pdf') 
  {
    cb(null, true);
  } else {
    cb(null, false)
  }
}
 
const cAttendence = multer({storage: fileStorage1, fileFilter: fileFilter1}).single('clearAttendence');
const sAttendence = multer({storage: fileStorage2, fileFilter: fileFilter2}).single('shortageAttendence');
const universityExam = multer({storage: fileStorage3, fileFilter: fileFilter3}).single('universityExamFile');

router.get('/add-exam', adminLoggedIn, adminController.getAddExam);
router.post('/add-exam', adminLoggedIn, adminController.postAddExam);
router.post('/delete-exam', adminLoggedIn, adminController.postDeleteExam);

router.get('/add-faculty', adminLoggedIn, adminController.getAddFaculty);
router.post('/add-faculty', adminLoggedIn, adminController.postAddFaculty);

router.get('/add-student', adminLoggedIn, adminController.getAddStudent);
router.post('/add-student', adminLoggedIn, adminController.postAddStudent);

router.get('/clear-attendence', adminLoggedIn, adminController.getClearAttendence);
router.get('/clear-attendence/:cAttendence_id', adminLoggedIn, adminController.getDeleteClearAttendence);
router.post('/clear-attendence', adminLoggedIn , cAttendence, adminController.postClearAttendence);

router.get('/generate-plans', adminLoggedIn, adminController.getGeneratePlans);

router.get('/profile', adminLoggedIn, adminController.getProfile);
router.get('/profile/:admin_id', adminLoggedIn, adminController.getDeleteAdmin);
router.post('/profile', adminLoggedIn, adminController.postProfile);

router.get('/shortage-attendence', adminLoggedIn, adminController.getShortageAttendence);
router.get('/shortage-attendence/:sAttendence_id', adminLoggedIn, adminController.getDeleteShortageAttendence);
router.post('/shortage-attendence', adminLoggedIn, sAttendence, adminController.postShortageAttendence);

router.get('/university-exam', adminLoggedIn, adminController.getUniversityExam);
router.get('/university-exam/:universityExam_id', adminLoggedIn, adminController.getDeleteUniversityExam);
router.post('/university-exam', adminLoggedIn, universityExam, adminController.postUniversityExam);

router.get('/view-exam', adminLoggedIn, adminController.getViewExam);
router.get('/view-exam/:exam_id', adminLoggedIn, adminController.getExamTimeTable);

router.get('/view-faculty', adminLoggedIn, adminController.getViewFaculty);
router.post('/update-faculty', adminLoggedIn, adminController.postUpdateFaculty);
router.get('/delete-faculty/:faculty_id', adminLoggedIn, adminController.getDeleteFaculty);

router.get('/view-student', adminLoggedIn, adminController.getViewStudent);
router.post('/update-student', adminLoggedIn, adminController.postUpdateStudent);
router.get('/delete-student/:student_id', adminLoggedIn, adminController.getDeleteStudent);

router.use('/home', adminLoggedIn, adminController.getHome);

router.use('/update-password', adminLoggedIn, adminController.postUpdatePassword);

router.get('/logout', adminLoggedIn, adminController.getLogout);

module.exports = router