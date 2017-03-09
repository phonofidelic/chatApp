import axios from 'axios';
import cookie from 'react-cookie';
import io from 'socket.io-client';
import { AUTH_USER,
				 AUTH_ERROR,
				 UNAUTH_USER,
				 PROTECTED_TEST } from '../actiontypes/auth';
import { VIEW_PROFILE,
				 GET_CONVERSATION_LIST,
				 GET_CONVERSATION,
				 POST_MESSAGE,
				 CHECK_EMAIL } from '../actiontypes/user';			

const API_URL = 'http://localhost:3001/api';
const CLIENT_ROOT_URL = 'http://localhost:3000';

// Connect to socket.io server
export const socket = io.connect(CLIENT_ROOT_URL);	

export function errorHandler(dispatch, error, type) {
	let errorMessage = '';

	if (error.data.error) {
		errorMessage = error.data.error;
	} else if (error.data) {
		errorMessage = error.data;
	} else {
		errorMessage = error;
	}

	if (error.status === 401) {
		dispatch({
			type: type,
			payload: 'You are not authorized to do this. Please log in and try again.'
		});
		logoutUser();
	} else {
		dispatch({
			type: type,
			payload: errorMessage
		});
	}
}

export function checkForExistingUser(email) {
	return function(dispatch) {
		console.log('@checkForExistingUser email:', email.target.value);
		axios.get(`${API_URL}/user/check/${email.target.value}`)
		.then(response => {
			console.log('@checkForExistingUser:', response);

			dispatch({
				type: CHECK_EMAIL,
				payload: response.data.message
			});
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	};
};

export function loginUser({ email, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/auth/login`, { email, password })
		.then(response => {
			cookie.save('token', response.data.token, { path: '/' });
			cookie.save('user', response.data.user, { path: '/' });
			dispatch({ type: AUTH_USER });
			window.location.href = CLIENT_ROOT_URL + '/dashboard';
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	}
}

export function registerUser({ email, username, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/auth/register`, { email, username, password }).then(response => {
			cookie.save('token', response.data.token, { path: '/' });
			cookie.save('user', response.data.user, { path: '/' });
			dispatch({ type: AUTH_USER });
			window.location.href = CLIENT_ROOT_URL + '/dashboard'; 
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	}
}

export function logoutUser() {
	return function(dispatch) {
		dispatch({ type: UNAUTH_USER });
		cookie.remove('token', { path: '/'});
		cookie.remove('user', { path: '/'});
		window.location.href = CLIENT_ROOT_URL + '/login';
	}
}

export function protectedTest() {
	return function(dispatch) {
		axios.get(`${API_URL}/user/protected`, {
			headers: { Authorization: cookie.load('token') }
		}).then(response => {
			console.log('@protectedTest:', response.data.content)
			dispatch({
				type: PROTECTED_TEST,
				payload: response.data.content
			});
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	};
};

export function viewProfile() {
	const user = cookie.load('user');
	return (dispatch) => {
		axios.get(`${API_URL}/user/${user._id}`, {
			headers: { Authorization: cookie.load('token') }
		}).then(response => {
			console.log('@viewProfile:', response);
			dispatch({
				type: VIEW_PROFILE,
				payload: response.data.user
			});
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	};
};

export function getConversations() {
	return (dispatch) => {
		axios.get(`${API_URL}/chat/conversations`, {
			headers: { Authorization: cookie.load('token') }
		}).then(response => {
			console.log('@getConversations:', response);
			dispatch({
				type: GET_CONVERSATION_LIST,
				payload: response.data.conversations
			});
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	};
};

export function getConversation(conversationId) {
	return (dispatch) => {
		axios.get(`${API_URL}/chat/${conversationId}`, {
			headers: { Authorization: cookie.load('token') }
		}).then(response => {
			console.log('@getConversation:', response);
			dispatch({
				type: GET_CONVERSATION,
				payload: response.data.conversation
			})
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	};
};

export function postReply(conversationId, dataToSend) {
	console.log('@postReply composedMessage:', dataToSend.composedMessage)
	return (dispatch) => {
		axios.post(`${API_URL}/chat/${conversationId}`, dataToSend, { 
				headers:{ Authorization: cookie.load('token') }
		}).then(response => {
			console.log('@sendReply:', response);
			// TODO: emit socket event for new message
			socket.emit('new message', conversationId);
			
			dispatch({
				type: POST_MESSAGE,
				payload: response.data
			});

			
		});
	};
};


