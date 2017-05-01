import axios from 'axios';
import { reset } from 'redux-form';
import { browserHistory } from 'react-router';
import cookie from 'react-cookie';
import io from 'socket.io-client';
import { AUTH_USER,
				 AUTH_ERROR,
				 UNAUTH_USER,
				 PROTECTED_TEST,
				 CHECK_EMAIL } from '../actiontypes/auth';
import { VIEW_PROFILE,
				 GET_CONVERSATION_LIST,
				 GET_CONVERSATION,
				 GET_CONTACTS,
				 POST_MESSAGE,
				 INVITE_NEW_CONTACT,
				 TOGGLE_PROFILE_EDITOR,
				 TOGGLE_CONVERSATION_LIST,
				 TOGGLE_NEW_CONVERSATION,
				 TOGGLE_LOGOUT_BUTTON,
				 SAVE_PROFILE_CHANGES,
				 CONFIRM_ALLERT } from '../actiontypes/user';
// import { VALIDATE_EMAIL,
// 				 VALIDATE_PASSWORD } from '../actiontypes/validation';

const API_URL = '/api';

// Connect to socket.io server
export const socket = io.connect('/');	

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

// ################## Auth #####################

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
			window.location.href = '#/dashboard';
			
			// browserHistory.push('#/dashboard');
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
			window.location.href = '#/dashboard';
			// browserHistory.push('/dashboard');
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	}
}

export function registerWithReference(inviteId, { email, username, password }) {
	return function(dispatch) {
		axios.post(`${API_URL}/auth/register/${inviteId}`, { email, username, password }).then(response => {
			cookie.save('token', response.data.token, { path: '/' });
			cookie.save('user', response.data.user, { path: '/' });
			dispatch({ type: AUTH_USER });
			window.location.href = '#/dashboard';
			// browserHistory.push('/dashboard');
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
		// window.location.href = CLIENT_ROOT_URL + '/login';
		browserHistory.push('/');
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

// ################## User #####################

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
			return(response.data.user)
		}).then((userInfo) => {
			// users contact ids array as parameter, return username of each contact
			axios.post(`${API_URL}/user/${user._id}/contacts`, {"contacts": userInfo.contacts}, {
				headers: { Authorization: cookie.load('token') }
			}).then(response => {
				console.log('@getContacts:', response);
				let contactsToReturn = []
				response.data.forEach(contact => {
					contactsToReturn.push(contact[0]);
				});
				console.log('@getContacts: contactsToReturn', contactsToReturn);
				dispatch({
					type: GET_CONTACTS,
					payload: contactsToReturn
				});
			})
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	};
};

export function saveProfileChanges(newUsername) {
	const user = cookie.load('user');
	const body = {
		userId: user._id, 
		newUsername: newUsername
	}
	return (dispatch) => {
		axios.put(`${API_URL}/user/profile/username`, body, {
			headers: {Authorization: cookie.load('token')}
		}).then(response => {
			console.log('@saveProfileChanges:', response);
			dispatch({
				type: SAVE_PROFILE_CHANGES,
				payload: response.data
			});
		}).catch(err => {
			console.error('@saveProfileChanges:', err);
			errorHandler(dispatch, err.response, AUTH_ERROR);
		})
	}
}

export function confirmAllert() {
	return (dispatch) => {
		dispatch({
			type: CONFIRM_ALLERT,
		});
	}
}

export function inviteNewContact({contactEmail}) {
	const user = cookie.load('user');
	const body = {
		recipient: contactEmail,
		username: user.username,
		userEmail: user.email,
		confirmationLink: `https://phono-chat.herokuapp.com/#/register/${user._id}`
	};

	return (dispatch) => {
		axios.post(`${API_URL}/user/${user._id}/invite`, body, {
			headers: { Authorization: cookie.load('token') }
		}).then(response => {
			console.log('@addNewContact:', response);
			dispatch({
				type: INVITE_NEW_CONTACT,
				payload: response.data
			});
		}).catch(err => {
			errorHandler(dispatch, err.response, AUTH_ERROR);
		});
	}
}

// TODO: Combine toggle functions to one reusable function?

export function toggleProfileEditor() {
	return (dispatch) => {
		dispatch({
			type: TOGGLE_PROFILE_EDITOR
		});	
	}
}

export function toggleConversationList() {
	return (dispatch) => {
		dispatch({
			type: TOGGLE_CONVERSATION_LIST
		});	
	}
}

export function toggleNewConversation() {
	return (dispatch) => {
		dispatch({
			type: TOGGLE_NEW_CONVERSATION
		});	
	}
}

export function toggleLogoutButton() {
	return (dispatch) => {
		dispatch({
			type: TOGGLE_LOGOUT_BUTTON
		});	
	}
}

// ################## Chat #####################

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

export function startNewConversation(recipients, message) {
	console.log('@startNewConversation recipients:', recipients);
	return (dispatch) => {
		const user = cookie.load('user');
		recipients.push(user._id);

		let data = {
			composedMessage: message,
			recipients: recipients
		}
		console.log('@startNewConversation data:', data)

		axios.post(`${API_URL}/chat/new`, data, {
			headers: { Authorization: cookie.load('token') }
		}).then(response => {
			console.log('@startNewConversation response:', response);
			window.location.href = `#/dashboard/conversation/view/${response.data.conversationId}`
		})
	}
};

export function postReply(conversationId, dataToSend) {
	console.log('@postReply composedMessage:', dataToSend.composedMessage)
	return (dispatch) => {
		axios.post(`${API_URL}/chat/reply/${conversationId}`, dataToSend, { 
				headers:{ Authorization: cookie.load('token') }
		}).then(response => {
			console.log('@sendReply:', response);
			socket.emit('new message', conversationId);
			
			dispatch({
				type: POST_MESSAGE,
				payload: response.data
			});
			dispatch(reset('replyMessage'));	
		});
	};
};

// ################## Validation #####################
export function validateEmail() {
	
}

