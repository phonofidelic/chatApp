import { VIEW_PROFILE, 
				 GET_CONVERSATION_LIST,
				 GET_CONVERSATION,
				 POST_MESSAGE,
				 CHECK_EMAIL,
				 GET_CONTACTS } from '../actiontypes/user';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case VIEW_PROFILE:
			return {
				...state,
				userInfo: action.payload
			};

		case GET_CONVERSATION_LIST:
			return {
				...state,
				conversations: action.payload
			};

		case GET_CONVERSATION:
			return {
				...state,
				conversation: action.payload
			};

		case POST_MESSAGE:
			return {
				...state,
				message: action.payload
			};

		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload
			};
			
		default:
			return state;
	}
}