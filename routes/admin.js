
const express = require('express');
const router = express.Router()

const adminController = require('../controller/admin');

router.get('/add-exam', adminController.addExam);
router.get('/add-faculty', adminController.addFaculty);
router.get('/add-student', adminController.addStudent);
router.get('/clear-attendence', adminController.clearAttendence);
router.get('/generate-plans', adminController.generatePlans);
router.get('/', adminController.index);
router.get('/profile', adminController.profile);
router.get('/shortage-attendence', adminController.shortageAttendence);
router.get('/university-exam', adminController.universityExam);
router.get('/view-exam', adminController.viewExam);
router.get('/view-faculty', adminController.viewFaculty);
router.get('/view-student', adminController.addStudent);




module.exports = router