var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var methodOverride = require('method-override');

const indexRouter = require('./routes/index');
const restaurantChoicesRouter = require('./routes/restaurant-choices');
const usersRouter = require('./routes/users');
const locationRouter = require('./routes/location');
const savedrestaurantsRouter = require('./routes/saved-restaurants');

require('dotenv').config();
require('./config/database');
require('./config/passport');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  // add req.user to res.locals
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter);
app.use('/restaurant-choices', restaurantChoicesRouter);
app.use('/users', usersRouter);
app.use('/', savedrestaurantsRouter);
app.use('/', locationRouter);

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
