
const express = require('express');
const router = express.Router()

const facultyController = require('../controller/faculty');

router.get('/clear-attendence', facultyController.clearAttendence);
router.get('/', facultyController.index);
router.get('/profile', facultyController.profile);
router.get('/shortage-attendence', facultyController.shortageAttendence);


module.exports = router