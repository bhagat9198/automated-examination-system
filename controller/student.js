exports.clearAttendence = (req, res, next) => {
  return res.render('student/clear-attendence');
}

exports.index = (req, res, next) => {
  return res.render('student/index');
}

exports.profile = (req, res, next) => {
  return res.render('student/profile');
}

exports.shortageAttendence = (req, res, next) => {
  return res.render('student/shortage-attendence');
}