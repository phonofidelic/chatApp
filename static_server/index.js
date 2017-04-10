'use-strict';

var express = require('express');
var app = express();
var path = require('path');
var socketEvents = require('./socketEvents');

var staticFiles = express.static(path.join(__dirname, '../client/build'));

app.use(staticFiles);

// app.get('*', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
// })

var server= app.listen(process.env.PORT || 8080, function() {
	console.log('Static files served on port 8080');
});

// set up socket.io
var io = require('socket.io').listen(server);

socketEvents(io);