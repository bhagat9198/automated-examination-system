exports.adminLoggedIn = (req, res, next) => {
  if(req.session.adminLoggedIn) {
    next();
  } else {
    return res.render('unauthorized', {
      pageTitle: 'Unauthorized'
    });
  }
};

exports.studentLoggedIn = (req, res, next) => {
  if(req.session.studentLoggedIn) {
    next();
  } else {
    return res.render('unauthorized', {
      pageTitle: 'Unauthorized'
    });
  }
};

exports.facultyLoggedIn = (req, res, next) => {
  if(req.session.facultyLoggedIn) {
    next();
  } else {
    return res.render('unauthorized', {
      pageTitle: 'Unauthorized'
    });
  }
};