
const express = require('express');
const router = express.Router()

const studentController = require('../controller/student');

router.get('/clear-attendence', studentController.clearAttendence);
router.get('/', studentController.index);
router.get('/profile', studentController.profile);
router.get('/shortage-attendence', studentController.shortageAttendence);

module.exports = router