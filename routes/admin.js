
const express = require('express');
const multer = require('multer');
const uniqid = require('uniqid');

const router = express.Router();

const adminController = require('../controller/admin');

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

router.get('/add-exam', adminController.getAddExam);
router.post('/add-exam', adminController.postAddExam);
router.post('/delete-exam', adminController.postDeleteExam);

router.get('/add-faculty', adminController.getAddFaculty);
router.post('/add-faculty', adminController.postAddFaculty);

router.get('/add-student', adminController.getAddStudent);
router.post('/add-student', adminController.postAddStudent);

router.get('/clear-attendence', adminController.getClearAttendence);
router.get('/clear-attendence/:cAttendence_id', adminController.getDeleteClearAttendence);
router.post('/clear-attendence',cAttendence, adminController.postClearAttendence);

router.get('/generate-plans', adminController.getGeneratePlans);

router.get('/profile', adminController.getProfile);
router.get('/profile/:admin_id', adminController.getDeleteAdmin);
router.post('/profile', adminController.postProfile);

router.get('/shortage-attendence', adminController.getShortageAttendence);
router.get('/shortage-attendence/:sAttendence_id', adminController.getDeleteShortageAttendence);
router.post('/shortage-attendence', sAttendence, adminController.postShortageAttendence);

router.get('/university-exam', adminController.getUniversityExam);
router.get('/university-exam/:universityExam_id', adminController.getDeleteUniversityExam);
router.post('/university-exam', universityExam, adminController.postUniversityExam);

router.get('/view-exam', adminController.getViewExam);
router.get('/view-exam/:exam_id', adminController.getExamTimeTable);

router.get('/view-faculty', adminController.getViewFaculty);
router.post('/update-faculty', adminController.postUpdateFaculty);
router.get('/delete-faculty/:faculty_id', adminController.getDeleteFaculty);

router.get('/view-student', adminController.getViewStudent);
router.post('/update-student', adminController.postUpdateStudent);
router.get('/delete-student/:student_id', adminController.getDeleteStudent);

router.use('/home', adminController.getIndex);



module.exports = router