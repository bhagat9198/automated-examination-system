
exports.addExam = (req, res, next) => {
  return res.render('admin/add-exam', {
    pageTitle: 'Add Exam |Admin Dashboard'
  });
}

exports.addFaculty = (req, res, next) => {
  return res.render('admin/add-faculty', {
    pageTitle: 'Add Faculty |Admin Dashboard'
  });
}

exports.addStudent = (req, res, next) => {
  return res.render('admin/add-student', {
    pageTitle: 'Add Student |Admin Dashboard'
  });
}

exports.clearAttendence = (req, res, next) => {
  return res.render('admin/clear-attendence', {
    pageTitle: 'Clear Attendence |Admin Dashboard'
  });
}

exports.generatePlans = (req, res, next) => {
  return res.render('admin/generate-plans', {
    pageTitle: 'Generate Plans |Admin Dashboard'
  });
}

exports.index = (req, res, next) => {
  return res.render('admin/index', {
    pageTitle: 'Admin Dashboard'
  });
}

exports.profile = (req, res, next) => {
  return res.render('admin/profile', {
    pageTitle: 'Profile |Admin Dashboard'
  });
}

exports.shortageAttendence = (req, res, next) => {
  return res.render('admin/shortage-attendence', {
    pageTitle: 'Shortage Attendence |Admin Dashboard'
  });
}

exports.universityExam = (req, res, next) => {
  return res.render('admin/university-exam', {
    pageTitle: 'University Exam |Admin Dashboard'
  });
}

exports.viewExam = (req, res, next) => {
  return res.render('admin/view-exam', {
    pageTitle: 'View Exam |Admin Dashboard'
  });
}

exports.viewFaculty = (req, res, next) => {
  return res.render('admin/view-faculty', {
    pageTitle: 'View Faculty |Admin Dashboard'
  });
}

exports.viewStudent = (req, res, next) => {
  return res.render('admin/view-student', {
    pageTitle: 'View Student |Admin Dashboard'
  });
}
