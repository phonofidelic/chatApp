var socket = io();

var Message = function(msg) {
	this.html = '<li v-on:click="openReply">'+msg+'</li>'
};

Message.prototype.openReply = function(message) {
	console.log('click:', this)
};

$(document).ready(
	function() {
		// var chat = new chatController();
		console.log('testing');
		app.getInitialMessages();
		socket.on('chat message', function(msg) {
			// var message = new Message(msg);
			// $('#messages').append('<message>');
			console.log('msg', msg)
		});
		// // Chat
		
		// $('form').submit(function() {

		// });
	}
);

Vue.component('message', {
	data: function() {
		return {
			replies: [],
			currentReply: '',
			isActive: false
		}
	},
	props: ['text', '_id', 'created-at'],
	template: '<li v-on:click="this.openReply" class="message" :class="{ active: isActive }">{{text}}</li>',
	methods: {
		openReply: function() {
			console.log('openReply', this);
			var self = this;
			// set currentRoute to selected message
			app.currentRoute = '/messages/'+this.id+'/replies';
			app.currentRouteId = this.id;
			console.log('currentRoute:', app.currentRoute);
			// app.messages.forEach(function(message) {
			// 	message.isActive = true;
			// });
			this.isActive = !this.isActive;


			// var ev = new Event('select');

		},
		getReplies: function() {
			// var self = this;
			this.$http.get('/messages/'+this.id+'/replies').then(function(response) {
				console.log('response:', response);
				// response.data.replies.forEach(function(reply) {
				// 	this.replies.push(reply);
				// });
 			});
		},
		test: function() {
			console.log('test')
		}
	}
});

var app = new Vue({
	el: '#app',
	data: {
		messages: [],
		currentMessage: '',
		currentRoute: '/messages'
	},
	methods: {
		getInitialMessages: function() {
			var self = this;
			this.$http.get('/messages').then(function(response) {
				console.log('Initial messages:', response.data);
				response.data.forEach(function(message) {
					self.messages.push(message);
					// $('#messages').append('<li><message>{{this.message}}');
					// var message = new Message(message.text);
					// $('#messages').append(message.html);
				});
			})
		},
		postMessage: function(route) {
			var self = this;
			console.log('post message:', this.currentMessage);
			// socket.emit('chat message', this.currentMessage);
			this.$http.post(route, {"text": this.currentMessage}).then(function(response) {
				console.log('"POST" response:', response.data);
				self.messages.push(response.data);
				socket.emit('chat message', this.currentMessage);
			})
			// return false;
		},
		selectMessage: function(msg) {
			console.log('selected message:', msg);
		}
		// ,
		// openReply: function() {
		// 	console.log('click:', this)
		// }
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