
const express = require('express');
const router = express.Router()

const facultyController = require('../controller/faculty');
const facultyLoggedIn = require('../middleware/loggedIn').facultyLoggedIn;

router.get('/clear-attendence', facultyLoggedIn, facultyController.getClearAttendence);
router.get('/clear-attendence/:clearAttendence_id', facultyLoggedIn, facultyController.getDownloadClearAttendence);

router.get('/profile', facultyLoggedIn, facultyController.getProfile);

router.get('/university-exam/:universityExam_id', facultyLoggedIn, facultyController.getDownloadUniversityExams);

router.get('/applyExam', facultyLoggedIn, facultyController.getApplyExam);

router.get('/shortage-attendence', facultyLoggedIn, facultyController.getShortageAttendence);
router.get('/shortage-attendence/:shortageAttendence_id', facultyLoggedIn, facultyController.getDownloadShortageAttendence);

router.get('/home', facultyLoggedIn, facultyController.getHome);

router.get('/apply-exam/:exam_id', facultyLoggedIn, facultyController.getApplyExam);

router.post('/update-password', facultyLoggedIn, facultyController.postUpdatePassword);

router.get('/logout', facultyLoggedIn, facultyController.getLogout);

module.exports = router