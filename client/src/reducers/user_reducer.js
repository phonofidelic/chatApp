import { VIEW_PROFILE } from '../actiontypes/user';

const INITIAL_STATE = {};

export default function(state = INITIAL_STATE, action) {
	switch (action.type) {
		case VIEW_PROFILE:
			return {
				...state,
				userInfo: action.payload
			};

			// return {
			// 	id: action.payload._id,
			// 	username: action.payload.username,
			// 	email: action.payload.email,
			// 	role: action.payload.role
			// }

			default:
				return state;
	}
}