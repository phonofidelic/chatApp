import { VIEW_PROFILE, 
				 GET_CONVERSATION_LIST,
				 GET_CONVERSATION,
				 POST_MESSAGE,
				 CHECK_EMAIL,
				 GET_CONTACTS,
				 INVITE_NEW_CONTACT,
				 TOGGLE_PROFILE_EDITOR,
				 TOGGLE_CONVERSATION_LIST } from '../actiontypes/user';

const INITIAL_STATE = { showProfileEditor: false, showConversationList: true };

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

		case INVITE_NEW_CONTACT:
			return {
				...state,
				inviteStatus: action.payload
			}

		case TOGGLE_PROFILE_EDITOR:
			return {
				...state,
				showProfileEditor: !state.showProfileEditor
			}

		case TOGGLE_CONVERSATION_LIST:
			return {
				...state,
				showConversationList: !state.showConversationList
			}
			
		default:
			return state;
	}
}