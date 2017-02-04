var socket = io();
$(document).ready(
	function() {
		// var chat = new chatController();
		console.log('testing');
		app.getInitialMessages();
		socket.on('chat message', function(msg) {
			$('#messages').append($('<li>').text(msg));
		});
		// // Chat
		
		// $('form').submit(function() {

		// });
	}
);

var app = new Vue({
	el: '#app',
	data: {
		message: 'hello Vue!',
		currentMessage: ''
	},
	methods: {
		getInitialMessages: function() {
			this.$http.get('/messages').then(function(response) {
				console.log('Initial messages:', response.data);
				response.data.forEach(function(message) {
					$('#messages').append($('<li>').text(message.text));
				});
			})
		},
		postMessage: function() {
			console.log('post message:', this.currentMessage);
			socket.emit('chat message', this.currentMessage)
			this.$http.post('/messages', {"text": this.currentMessage}).then(function(response) {
				console.log('"POST" response:', response.data);
			})
			// return false;
		},
		recieveMessage: function(msg) {
			
		}
	}
});

// var chatController = function() {
// 	this.getInitialMessages = function() {
// 		$.getJSON('messages', function(data) {
// 			console.log('messages:', data);
// 		});
// 	};

// 	this.postMessage = function(msg) {
// 		$.post('messages', { "text": msg }, function(data) {
// 			console.log('post:', data);
// 		});
// 	}
// };

// // Get messages
// function getInitialMessages() {
// 	$.getJSON('messages', function(data) {
// 		console.log('messages:', data);
// 	});
// };

// // Send message
// function postMessage(msg) {
// 	$.post('messages', { "text": msg }, function(data) {
// 		console.log('post:', data);
// 	});
// };

// // Reply to message