var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var  chalk = require('chalk');
var dotenv = require('dotenv');
var pretty = require('express-prettify');
var bodyParser = require('body-parser'); 

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//Load controllers
var controller = require('./controllers/index');

/**
 * load .env file
 */

dotenv.load({path:'.env.example'})

/**
 * Connect to MongoDB
 */
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * used to prettify responses
 */

app.use(pretty({ query: 'pretty' }));

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4202');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

/**
 * controller methods
 */

//Get all questions
app.get('/questions',controller.getQuestions);

//Get questions according to the test id
app.get('/test/:id',controller.getTest)

//to get a add test form
app.get('/test', controller.getTestForm)

//to add a question.
app.post('/question',controller.addQuestion);

//to add an employee 
app.post('/employee',controller.addEmployee);

//to add an stream
app.post('/stream',controller.addStream);

//to add a category
app.post('/category', controller.addCategory);


//to submit applicants result and update applicant document.
app.post('/test/:id',controller.updateTest)

//to add a test
app.post('/test',controller.addTest);

//to jumble all options with respect to the questions. 
app.get('/jumbleoptions',controller.jumbleOptions);

//to add an applicant and to generate test id
app.post('/applicant/:id', controller.addApplicant);

//get add applicant page
app.get('/applicant', controller.getApplicantForm)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
