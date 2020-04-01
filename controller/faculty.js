exports.clearAttendence = (req, res, next) => {
  return res.render('faculty/clear-attendence', {
    pageTitle: 'Clear Attendence |Faculty Dashboard'
  });
}

exports.index = (req, res, next) => {
  return res.render('faculty/index', {
    pageTitle: 'Faculty Dashboard'
  });
}

exports.profile = (req, res, next) => {
  return res.render('faculty/profile', {
    pageTitle: 'Profile |Faculty Dashboard'
  });
}

exports.shortageAttendence = (req, res, next) => {
  return res.render('faculty/shortage-attendence', {
    pageTitle: 'Shortage Attendence |Faculty Dashboard'
  });
}