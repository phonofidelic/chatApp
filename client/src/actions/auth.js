import * as AuthActionTypes from '../actiontypes/auth';

export const postMessage = msg => {
	return {
		type: AuthActionTypes.POST_MESSAGE,
		msg
	}
}