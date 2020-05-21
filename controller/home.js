
exports.getIndex = (req, res, next) => {
  return res.render('index');
}

exports.postAdminLogin = (req, res, next) => {

};

exports.postFacultyLogin = (req, res, next) => {
  return res.redirect('/faculty/home');
};

exports.postStudentLogin = (req, res, next) => {
  return res.redirect('/student/home');
};