'use strict';

exports = module.exports = function (io) {
	io.on('connection', function (socket) {
		console.log('a user connected');

		socket.on('enter conversation', function (conversation) {
			socket.join(conversation);
			console.log('joined', conversation);
		});

		socket.on('leave conversation', function (conversation) {
			socket.leave(conversation);
			console.log('left', conversation);
		});

		socket.on('new message', function (conversation) {
			console.log('new message:', conversation);
			io.sockets.in(conversation).emit('refresh messages', conversation);
		});

		socket.on('disconnect', function () {
			console.log('user disconnected');
		});
	});

	// // old setup
	// 	io.on('connection', function(socket) {
	// 		console.log('* A user connected');
	// 		socket.on('disconnect', function() {
	// 			console.log('* A user disconnected');
	// 		});

	// 		socket.on('chat message', function(msg) {
	// 			console.log('* message sent:', msg);
	// 			io.emit('new message', msg);
	// 		});

	// 		socket.on('chat response', function(msg) {
	// 			console.log('*response to '+msg._id+':', msg.text);
	// 			io.emit('new response', msg);
	// 		});
	// 	});
};