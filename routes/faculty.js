
const express = require('express');
const router = express.Router()

const facultyController = require('../controller/faculty');

router.get('/clear-attendence', facultyController.getClearAttendence);
router.get('/clear-attendence/:clearAttendence_id', facultyController.getDownloadClearAttendence);

router.get('/profile', facultyController.getProfile);

router.get('/university-exam/:universityExam_id', facultyController.getDownloadUniversityExams);

router.get('/applyExam', facultyController.getApplyExam);

router.get('/shortage-attendence', facultyController.getShortageAttendence);
router.get('/shortage-attendence/:shortageAttendence_id', facultyController.getDownloadShortageAttendence);

router.get('/home', facultyController.getHome);

module.exports = router