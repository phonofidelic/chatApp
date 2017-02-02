'use-strict';

var fs = require('fs');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var messages = [];
var msgData = {};

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log('a user connected');
	socket.on('disconnect', function() {
		console.log('a user disconnected');
	});

	socket.on('chat message', function(msg) {
		console.log('message:' + msg);
		io.emit('chat message', msg);

		msgData.msg = msg;
		msgData.time = new Date();
		fs.appendFile('messages.json', JSON.stringify(msgData)+',\n', function(err) {
			if (err) throw err;
			console.log('Appended message: '+ msg+' to messages.txt');
		});
		console.log('msgData:', msgData);
	});


});

http.listen(8080, function() {
	console.log('Server litening on *:8080');
});