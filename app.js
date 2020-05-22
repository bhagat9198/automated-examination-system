// core module
const path = require('path');

// 3 party
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDbStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');

// user defined
const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin');
const facultyRoutes = require('./routes/faculty');
const studentRoutes = require('./routes/student');
const homeRoutes = require('./routes/home');

const app = express();

MONGODB_URI = 'mongodb+srv://owner:owner@nodeapp-oke9f.mongodb.net/examSystem?';

app.use(flash());

const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: 'sessions'
});

app.use(session({
  secret: 'nodeApp',
  resave: false,
  saveUninitialized: false,
  store: store
}));

app.use(bodyParser.urlencoded({ extended: true }));

// setting up templating engine
app.set('view engine', 'ejs');
app.set('views', 'views');
// telling server about public files
app.use(express.static(path.join(rootDir, 'public')));
// app.use(express.static(path.join(rootDir, 'data')));


// adding the routes
app.use('/admin', adminRoutes);
app.use('/faculty', facultyRoutes);
app.use('/student', studentRoutes);
app.use('/', homeRoutes);

// if no route got matched 
app.use((req, res, next) =>{
  res.render('404', {
    pageTitle: '404'
  });
})

mongoose.connect(MONGODB_URI, { useUnifiedTopology: true ,useNewUrlParser: true })
.then(result => {
  console.log('CONNECTED AT PORT 3000');
  app.listen(3000);
})
.catch(err => console.log(err));