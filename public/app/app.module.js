
/**
* chatApp Module
*
* Description
*/
angular.module('chatApp', ['btford.socket-io'])
.factory('socket', function(socketFactory){
	return socketFactory();
});
