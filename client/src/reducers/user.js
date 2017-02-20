import * as UserActionTypes from '../actiontypes/user.js';
import axios from 'axios';

// state === messages???
const initialState = [];

export default function User(state = initialState, action) {
	switch (action.type) {
		case UserActionTypes.POST_MESSAGE:
			return [
				...state,
				{
					text: action.text
				}
			];

		default:
			return state;
	}
}