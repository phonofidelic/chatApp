'use-strict';

var express = require('express');
var app = express();
var routes = require('./routes');
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

var jsonParser = require('body-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(jsonParser.json());

var mongoose = require('mongoose');

// local
mongoose.connect('mongodb://localhost:27017/chatApp');
//heroku
// mongoose.connect('mongodb://heroku_djrv4shx:3q2trf5i3gbddvd8dtgpa0u2ca@ds139959.mlab.com:39959/heroku_djrv4shx');

var db = mongoose.connection;

db.on('error', function(err) {
	console.log('connection error:', err);
});

db.once('open', function() {
	console.log('db connection succesfull!');
});

app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});

// app.use('/', express.static(path.join(__dirname, 'public_react')));

app.use('/messages', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// Error Handler
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.json({
		error: {
			message: err.message
		}
	});
});

io.on('connection', function(socket) {
	console.log('* A user connected');
	socket.on('disconnect', function() {
		console.log('* A user disconnected');
	});

	socket.on('chat message', function(msg) {
		console.log('* message sent:', msg);
		io.emit('chat message', msg);
	})
});

var port = process.env.PORT || 8081;

server.listen(port, function() {
	console.log('Express server listening on port', port);
});