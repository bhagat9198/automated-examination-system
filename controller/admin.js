
exports.addExam = (req, res, next) => {
  return res.render('admin/add-exam');
}

exports.addFaculty = (req, res, next) => {
  return res.render('admin/add-faculty');
}

exports.addStudent = (req, res, next) => {
  return res.render('admin/add-student');
}

exports.clearAttendence = (req, res, next) => {
  return res.render('admin/clear-attendence');
}

exports.generatePlans = (req, res, next) => {
  return res.render('admin/generate-plans');
}

exports.index = (req, res, next) => {
  return res.render('admin/index');
}

exports.profile = (req, res, next) => {
  return res.render('admin/profile');
}

exports.shortageAttendence = (req, res, next) => {
  return res.render('admin/shortage-attendence');
}

exports.universityExam = (req, res, next) => {
  return res.render('admin/university-exam');
}

exports.viewExam = (req, res, next) => {
  return res.render('admin/view-exam');
}

exports.viewFaculty = (req, res, next) => {
  return res.render('admin/view-faculty');
}

exports.viewStudent = (req, res, next) => {
  return res.render('admin/view-student');
}
