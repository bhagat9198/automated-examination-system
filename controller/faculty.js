exports.clearAttendence = (req, res, next) => {
  return res.render('faculty/clear-attendence');
}

exports.index = (req, res, next) => {
  return res.render('faculty/index');
}

exports.profile = (req, res, next) => {
  return res.render('faculty/profile');
}

exports.shortageAttendence = (req, res, next) => {
  return res.render('faculty/shortage-attendence');
}