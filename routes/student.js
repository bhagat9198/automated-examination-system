
const express = require('express');
const router = express.Router()

const studentController = require('../controller/student');
const studentLoggedIn= require('../middleware/loggedIn').studentLoggedIn;

router.get('/clear-attendence', studentLoggedIn, studentController.getClearAttendence);
router.get('/clear-attendence/:clearAttendence_id', studentLoggedIn, studentController.getDownloadClearAttendence);

router.get('/profile', studentLoggedIn, studentController.getProfile);

router.get('/download-university-exam/:unversityExam_id', studentLoggedIn, studentController.getDownloadUniversityExam);

router.get('/shortage-attendence', studentLoggedIn, studentController.getShortageAttendence);
router.get('/shortage-attendence/:shortageAttendence_id', studentLoggedIn, studentController.getDownloadShortageAttendence);

router.get('/home', studentLoggedIn, studentController.getHome);

router.post('/update-password', studentLoggedIn, studentController.postUpdatePassword);

router.get('/logout', studentLoggedIn, studentController.getLogout);

module.exports = router