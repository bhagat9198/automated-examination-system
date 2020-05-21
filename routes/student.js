
const express = require('express');
const router = express.Router()

const studentController = require('../controller/student');

router.get('/clear-attendence', studentController.getClearAttendence);
router.get('/clear-attendence/:clearAttendence_id', studentController.getDownloadClearAttendence);

router.get('/profile', studentController.getProfile);

router.get('/download-university-exam/:unversityExam_id', studentController.getDownloadUniversityExam);

router.get('/shortage-attendence', studentController.getShortageAttendence);
router.get('/shortage-attendence/:shortageAttendence_id', studentController.getDownloadShortageAttendence);

router.use('/home', studentController.getHome);


module.exports = router