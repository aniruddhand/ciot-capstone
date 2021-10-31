var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');
var statusRouter = require('./routes/status');
var alertsRouter = require('./routes/alerts');
var buildingsRouter = require('./routes/buildings');
var buildingRouter = require('./routes/building');
var apartmentsRouter = require('./routes/apartments');
var apartmentRouter = require('./routes/apartment');
var registrationsRouter = require('./routes/registrations');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/login', loginRouter);
app.use('/', dashboardRouter);
app.use('/status', statusRouter);
app.use('/alerts', alertsRouter);
app.use('/buildings', buildingsRouter);
app.use('/buildings/{:bldid}', buildingRouter);
app.use('/buildings/{:bldid}/apartments', apartmentsRouter);
app.use('/buildings/{:bldid}/apartments/{:aptid}', apartmentRouter);
app.use('/register', registrationsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return error message
  res.status(err.status || 500);
  res.send({
    "code": error.status,
    "message": error.message
  });
});

module.exports = app;