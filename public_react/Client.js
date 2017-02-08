function getMessages() {
	return fetch('/messages', {
		accept: 'application/json'
	}).then(checkStatus().then(parseJSON);
}

const Client = { search };
export default Client;