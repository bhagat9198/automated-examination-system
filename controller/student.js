exports.clearAttendence = (req, res, next) => {
  return res.render('student/clear-attendence', {
    pageTitle: 'Clear Attendence |Faculty Dashboard'
  });
}

exports.index = (req, res, next) => {
  return res.render('student/index', {
    pageTitle: 'Faculty Dashboard'
  });
}

exports.profile = (req, res, next) => {
  return res.render('student/profile', {
    pageTitle: 'Profile |Faculty Dashboard'
  });
}

exports.shortageAttendence = (req, res, next) => {
  return res.render('student/shortage-attendence', {
    pageTitle: 'Shortage Attendence |Faculty Dashboard'
  });
}