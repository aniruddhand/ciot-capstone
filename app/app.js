const { StatusCodes, ReasonPhrases } = require('http-status-codes');

var express = require('express');
var session = require('express-session');
var path = require('path');
var logger = require('morgan');

var DynamoDBStore = require('connect-dynamodb')({'session': session});

var sessionsStoreConfig = require('./config/store_options');
var sessionConfig = require('./config/session_options');

var sessionRouter = require('./routes/session');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
// var summaryRouter = require('./routes/summary');
var statusRouter = require('./routes/status');
// var alertsRouter = require('./routes/alerts');
// var buildingsRouter = require('./routes/buildings');
// var buildingRouter = require('./routes/building');
// var apartmentsRouter = require('./routes/apartments');
// var apartmentRouter = require('./routes/apartment');
var registrationsRouter = require('./routes/registrations');
var timeseriesRouter = require('./routes/timeseries');

var sessionValidator = require('./lib/session_validator');
var sessionTTLSetter = require('./lib/session_ttl_setter');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ ...sessionConfig, store: new DynamoDBStore(sessionsStoreConfig) }));
app.use(sessionValidator());

// app.use('/', summaryRouter);
// app.use('/alerts', alertsRouter);
// app.use('/buildings', buildingsRouter);
// app.use('/buildings/{:bldid}', buildingRouter);
// app.use('/buildings/{:bldid}/apartments', apartmentsRouter);
// app.use('/buildings/{:bldid}/apartments/{:aptid}', apartmentRouter);
app.use('/api/login', loginRouter);
app.use('/api/logout', logoutRouter);
app.use('/api/register', registrationsRouter);
app.use('/api/session', sessionRouter);
app.use('/api/status', statusRouter);
app.use('/api/timeseries', timeseriesRouter);

app.use((err, req, res, next) => {
    console.log(err.toString());
    next(err);
});
app.use((err, req, res, next) => {
    if (!err.status) {
        err.status = StatusCodes.INTERNAL_SERVER_ERROR;
        err.stack = {
            'code': 'INT-ERR',
            'message': ReasonPhrases.INTERNAL_SERVER_ERROR
        }
    }

    res.status(err.status);
    res.send(err.stack);
});

setTimeout(() => {
    sessionTTLSetter();
}, 1000);

module.exports = app;
