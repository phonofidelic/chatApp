'use-strict';
angular.module('chatApp')
.controller('ChatController', ['$scope', '$http', '$log', function($scope, $http, $log){
	var vm = this;

	vm.getMessages = function() {
		$http.get('/messages').then(function(results) {
			console.log('results:', results);
			vm.messages = results.data;
		});
	};

	vm.postMessage = function(message) {
		$http.post('/messages', { "text": message });
	};
}]);