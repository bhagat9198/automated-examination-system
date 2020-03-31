// core module
const path = require('path');

// 3 party
const express = require('express');
const bodyParser = require('body-parser');

// user defined
const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin');
const facultyRoutes = require('./routes/faculty');
const studentRoutes = require('./routes/student');
const homeRoutes = require('./routes/home');


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

// setting up templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');
// telling server about public files
app.use(express.static(path.join(rootDir, 'public')));

// adding the routes
app.use('/admin', adminRoutes);
app.use('/faculty', facultyRoutes);
app.use('/student', studentRoutes);
app.use('/', homeRoutes);

// if no route got matched
app.use((req, res, next) =>{
  res.render('404');
})

// server creation and listening at port 3000
app.listen(3000);