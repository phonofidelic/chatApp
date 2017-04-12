'use strict';
'use-strict';

var express = require('express');
var app = express();
var router = require('./router');
var path = require('path');
// var server = require('http').Server(app);

var jsonParser = require('body-parser');
var logger = require('morgan');
var config = require('./config/main');
var mongoose = require('mongoose');
var passport = require('passport');
var socketEvents = require('./socketEvents');
// app.use(passport.initialize());

app.use(logger('dev'));
app.use(jsonParser.json());

var staticFiles = express.static(path.join(__dirname, '../../client/build'));

app.use(staticFiles);
// if (process.env.NODE_ENV === 'production') {
// 	app.use(staticFiles);
// }

// Connect to mongodb server with mongoose
mongoose.connect(config.database);

// Log db connection status
var db = mongoose.connection;
db.on('error', function (err) {
  console.log('connection error:', err);
});
db.once('open', function () {
  console.log('db connection succesfull!');
});

// Setting up basic middleware for all Express requests
app.use(jsonParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(jsonParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan


app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// app.use(staticFiles);

router(app);

var server = app.listen(config.port, function () {
  console.log('Express server listening on port', config.port);
});

var io = require('socket.io').listen(server);

socketEvents(io);