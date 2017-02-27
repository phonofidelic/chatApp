'use-strict';

var express = require('express');
var app = express();
var routes = require('./controllers/chatRoutes'); //TODO: move all related logic to router.js and import and implement router.js here
var router = require('./router');
var path = require('path');
// var server = require('http').Server(app);

var jsonParser = require('body-parser');
var logger = require('morgan');
var config = require('./config/main');

app.use(logger('dev'));
app.use(jsonParser.json());

const staticFiles = express.static(path.join(__dirname, '../../client/build'));

var mongoose = require('mongoose');



// Connect to mongodb server with mongoose
// TODO: bind to correct env var
// local
mongoose.connect(config.database);
//heroku
// mongoose.connect('mongodb://heroku_djrv4shx:3q2trf5i3gbddvd8dtgpa0u2ca@ds139959.mlab.com:39959/heroku_djrv4shx');

// Log connection status
var db = mongoose.connection;
db.on('error', function(err) {
	console.log('connection error:', err);
});
db.once('open', function() {
	console.log('db connection succesfull!');
});


let server;

server = app.listen(config.port, function() {
	console.log('Express server listening on port', config.port);
});

var io = require('socket.io').listen(server);

// app.use('/', express.static(path.join(__dirname, 'app/build')));
// app.use(staticFiles);

// app.use('/messages', routes);

// Setting up basic middleware for all Express requests
app.use(jsonParser.urlencoded({ extended: false })); // Parses urlencoded bodies
app.use(jsonParser.json()); // Send JSON responses
app.use(logger('dev')); // Log requests to API using morgan





// TODO: move to ./socketEvents.js
io.on('connection', function(socket) {
	console.log('* A user connected');
	socket.on('disconnect', function() {
		console.log('* A user disconnected');
	});

	socket.on('chat message', function(msg) {
		console.log('* message sent:', msg);
		io.emit('new message', msg);
	});

	socket.on('chat response', function(msg) {
		console.log('*response to '+msg._id+':', msg.text);
		io.emit('new response', msg);
	});
});


// Enable COORS for client
app.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Credentials', 'true');
	if(req.method === "OPTIONS") {
		res.header("Access-Control-Allow-Methods", "PUT,POST,DELETE");
		return res.status(200).json({});
	}
	next();
});


router(app);
// app.use(router);

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

module.exports = server;

