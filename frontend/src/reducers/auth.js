import { handleActions } from 'redux-actions';
import { set, flow, get, getOr } from 'lodash/fp';
import * as AT from 'constants/action-types';
import { LOGIN_GENERAL_ERROR } from 'constants/app-captions';

const initialState = {
	authenticated: true,
	credentials: {},
	loginErrorFromServer: false,
	inProgress: false,
	errorMessage: ''
};

const authReducer = handleActions(
	{
		[AT.LOGIN.PENDING]: (state) => flow([set('inProgress', true), set('errorMessage', '')])(state),

		[AT.LOGIN.SUCCESS]: (state, action) =>
			flow([
				set('inProgress', false),
				set('authenticated', true),
				set('credentials', action.meta),
				set('loginErrorFromServer', false)
			])(state),

		[AT.LOGIN.FAILURE]: (state, action) =>
			flow([
				set('inProgress', false),
				set('authenticated', false),
				set('credentials', {}),
				set('loginErrorFromServer', true),
				set('errorMessage', getOr(LOGIN_GENERAL_ERROR, 'error.message', action))
			])(state),

		[AT.LOGOUT.FAILURE]: (state, action) =>
			flow([
				set('authenticated', false),
				set('credentials', {}),
				set('inProgress', false),
				set('responseStatus', action.status)
			])(state),

		[AT.LOGOUT.PENDING]: (state) =>
			flow([set('inProgress', true), set('responseStatus', null)])(state),

		[AT.LOGOUT.SUCCESS]: (state) =>
			flow([
				set('authenticated', false),
				set('credentials', {}),
				set('inProgress', false),
				set('responseStatus', null)
			])(state),

		[AT.SESSION_EXPIRED]: (state) =>
			flow([set('authenticated', false), set('credentials', {}), set('responseStatus', null)])(
				state
			),
		'@@router/LOCATION_CHANGE': (state, action) => {
			const pathName = get('payload.location.pathname', action);
			if (pathName === '/login' || pathName === '/') {
				return { ...initialState, authenticated: state.authenticated };
			}
			return { ...state };
		}
	},
	initialState
);

export default authReducer;
