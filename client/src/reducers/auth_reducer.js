import { AUTH_USER,
				 UNAUTH_USER,
				 AUTH_ERROR,
				 PROTECTED_TEST,
				 CHECK_EMAIL } from '../actiontypes/auth';

const INITIAL_STATE = { error: '', message: '', content: '', authenticated: false }

export default function(state = INITIAL_STATE, action) {
	switch(action.type) {
		case AUTH_USER:
			return {
				...state,
				error: '',
				message: '',
				authenticated: true
			};

		case UNAUTH_USER:
			return {
				...state,
				authenticated: false
			};

		case AUTH_ERROR:
			return {
				...state,
				error: action.payload
			};

		case PROTECTED_TEST:
			return {
				...state,
				content: action.payload
			};

		case CHECK_EMAIL:
			return {
				...state,
				email: action.payload
			}

		default:
			return state;
	}
}