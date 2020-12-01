import { handleActions } from 'redux-actions';
import * as AT from 'constants/action-types';
import { get } from 'lodash/fp';

const initialState = {
	data: {},
	showReport: false,
	reportFail: false,
	loading: false
};

const logReducer = handleActions(
	{
		[AT.SHOW_REPORT.PENDING]: (state) => {
			return {
				...state,
				reportFail: false,
				loading: true
			};
		},
		[AT.SHOW_REPORT.SUCCESS]: (state, action) => {
			return {
				...state,
				data: action.payload,
				showReport: true,
				loading: false
			};
		},
		[AT.SHOW_REPORT.FAILURE]: (state) => {
			return {
				...state,
				reportFail: true,
				loading: false
			};
		},
		[AT.HIDE_REPORT_ERROR_DIALOG]: () => {
			return {
				...initialState
			};
		},
		[AT.HIDE_REPORT]: () => {
			return { ...initialState };
		},
		'@@router/LOCATION_CHANGE': (state, action) => {
			// if user click the BACK button of browser from /report url - it will
			// reset the reducer state
			if (get('payload.location.pathname', action) === '/dashboard') {
				return {
					...initialState
				};
			} else {
				return { ...state };
			}
		}
	},
	initialState
);

export default logReducer;
