
const express = require('express');
const router = express.Router()

const facultyController = require('../controller/faculty');

router.get('/clear-attendence', facultyController.clearAttendence);
router.get('/profile', facultyController.profile);
router.get('/shortage-attendence', facultyController.shortageAttendence);

router.use('/', facultyController.index);

module.exports = router