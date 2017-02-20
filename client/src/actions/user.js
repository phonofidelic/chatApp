import * as UserActionTypes from '../actiontypes/user';

export const postMessage = msg => {
	return {
		type: UserActionTypes.POST_MESSAGE,
		msg
	}
}