import { VIEW_PROFILE, 
				 GET_CONVERSATION_LIST,
				 GET_CONVERSATION,
				 POST_MESSAGE,
				 GET_CONTACTS,
				 INVITE_NEW_CONTACT,
				 TOGGLE_PROFILE_EDITOR,
				 TOGGLE_CONVERSATION_LIST,
				 TOGGLE_NEW_CONVERSATION,
				 TOGGLE_LOGOUT_BUTTON,
				 SAVE_PROFILE_CHANGES,
				 CONFIRM_ALLERT } from '../actiontypes/user';

const INITIAL_STATE = { 
	showProfileEditor: false, 
	showConversationList: true, 
	showNewConversation:false,
	showLogoutButton: false
};

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

		case SAVE_PROFILE_CHANGES:
			return {
				...state,
				showAllert: true
			}

		case CONFIRM_ALLERT:
			return {
				...state,
				showAllert:false
			}

		case TOGGLE_PROFILE_EDITOR:
			return {
				...state,
				showProfileEditor: !state.showProfileEditor,
				showConversationList: false,
				showNewConversation: false,
				showLogoutButton: false
			}

		case TOGGLE_CONVERSATION_LIST:
			return {
				...state,
				showConversationList: !state.showConversationList,
				showProfileEditor: false,
				showNewConversation: false,
				showLogoutButton: false
			}

		case TOGGLE_NEW_CONVERSATION:
			return {
				...state,
				showNewConversation: !state.showNewConversation,
				showProfileEditor: false,
				showConversationList: false,
				showLogoutButton: false
			}

		case TOGGLE_LOGOUT_BUTTON:
			return {
				...state,
				showNewConversation: false,
				showProfileEditor: false,
				showConversationList: false,
				showLogoutButton: !state.showLogoutButton
			}
			
		default:
			return state;
	}
}