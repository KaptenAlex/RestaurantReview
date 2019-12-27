var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bcrypt = require('bcryptjs');
/*
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;
*/
/*
var mysql = require('mysql');
*/
var indexRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');

var app = express();
/*
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  //database: "local",
  port: 10003
});
connection.connect(function(err){
  if (err) throw err;
  console.log("Connected");
});
*/
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/createAccount', registerRouter);

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
