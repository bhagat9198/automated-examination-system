const bcryptjs = require('bcryptjs');

const AddAdmin = require('../models/admin/profile').AddAdmin;
const Student = require('../models/admin/student');
const Faculty = require('../models/admin/faculty');


exports.getIndex = (req, res, next) => {
  let errorMessage = req.flash('error');
  if(errorMessage.length > 0) {
    // console.log(errorMessage);
  } else {
    errorMessage = null;
  }
  return res.render('index', {
    pageTitle: 'Home',
    errorMessage: errorMessage
  });
}

exports.postAdminLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  AddAdmin.findOne({email: email})
  .then(user => {
    if(user) {
      // console.log(user);
      
      bcryptjs.compare(password, user.password)
      .then(doMatch => {
        if(doMatch) {
          req.session.adminLoggedIn = true;
          req.session.user = user;
          req.flash('success', 'Successfully LoggedIn');
          return req.session.save(err => {
            if(!err) {
              return res.redirect('/admin/home')
            }
          });
        } else {
          req.flash('error', 'Invalid password');
          return req.session.save(err => {
            if(!err) {
              return res.redirect('/');
            }
          });
        }
      })
    } else {
      req.flash('error', 'Email not found');
      return req.session.save(err => {
        if(!err) {
          return res.redirect('/');
        }
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postFacultyLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Faculty.findOne({email: email})
  .then(user => {
    if(user) {
      // console.log(user);
      bcryptjs.compare(password, user.password)
      .then(doMatch => {
        if(doMatch) {
          req.session.facultyLoggedIn = true;
          req.session.user = user;
          req.flash('success', 'Successfully LoggedIn');
          return req.session.save(err => {
            if(!err) {
              return res.redirect('/faculty/home')
            }
          });
        } else {
          req.flash('error', 'Invalid password');
          return res.redirect('/');
        }
      })
    } else {
      req.flash('error', 'Email not found');
      return res.redirect('/');
    }
  })
  .catch(err => {
    console.log(err);
  });
};

exports.postStudentLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Student.findOne({email: email})
  .then(user => {
    if(user) {
      // console.log(user);
      bcryptjs.compare(password, user.password)
      .then(doMatch => {
        if(doMatch) {
          req.session.studentLoggedIn = true;
          req.session.user = user;
          req.flash('success', 'Successfully LoggedIn');
          return req.session.save(err => {
            if(!err) {
              return req.session.save(err => {
                if(err) {
                  console.log(err);
                }
                return res.redirect('/student/home');
              });
            }
          });
        } else {
          req.flash('error', 'Invalid password');
          return req.session.save(err => {
            if(err) {
              console.log(err);
            }
            return res.redirect('/');
          });
        }
      })
    } else {
      req.flash('error', 'Email not found');
      return req.session.save(err => {
        if(err) {
          console.log(err);
        }
        return res.redirect('/');
      });
    }
  })
  .catch(err => {
    console.log(err);
  });
};