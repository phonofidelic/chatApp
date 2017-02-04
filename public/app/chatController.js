'use-strict';
angular.module('chatApp')
.controller('ChatController', ['$scope', '$http', '$log', 'socket', function($scope, $http, $log, socket){
	var vm = this;

	vm.messages = [];	

	vm.getMessages = function() {
		$http.get('/messages').then(function(results) {
			console.log('results:', results);
			results.data.forEach(function(msg) {
				vm.messages.unshift(msg);
			});
		});
	};

	vm.postMessage = function(message) {
		$http.post('/messages', { "text": message });
		socket.emit('chat message', message);
	};

	socket.on('chat message', function(msg) {
		vm.messages.push(msg);
		console.log('message sent:', msg);
	});
}]);