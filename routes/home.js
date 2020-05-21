
const express = require('express');
const router = express.Router()

const homeController = require('../controller/home');

router.get('/', homeController.getIndex);

router.post('/admin-login', homeController.postAdminLogin);

router.post('/faculty-login', homeController.postFacultyLogin);

router.post('/student-login', homeController.postStudentLogin);

module.exports = router