import { VIEW_PROFILE, 
				 GET_CONVERSATION_LIST } from '../actiontypes/user';

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
			
		default:
			return state;
	}
}