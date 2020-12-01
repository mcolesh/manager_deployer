import { handleActions } from 'redux-actions';
import { get } from 'lodash/fp';
import * as AT from 'constants/action-types';

const initialState = {
	logFileSize: undefined,
	fetchLogSizeFinished: false,
	showLogWarningDialog: false,
	showLogModal: false,
	pageName: '',
	displayPageName: '',
	pageLogUrl: '',
	isActive: undefined,
	isFirstPageActiveStatusReceived: false,
	logText: '...',
	enableScrollDown: undefined,
	progressSteps: undefined,
	clickedStepValue: '',
	downloadLogText: '',
	fetchProgressStepsFinished: false,
	fetchLogFinished: false,
	isLastLogReceived: false,
	progressStepsMapIsReady: false,
	requestInAir: false
};

const logReducer = handleActions(
	{
		[AT.STORE_PAGE_LOG_PARAMS]: (state, action) => {
			return {
				...state,
				pageName: get(`payload.pageName`, action),
				displayPageName: get(`payload.displayName`, action),
				pageLogUrl: get(`payload.logUrl`, action)
			};
		},
		[AT.FETCH_LOG.PENDING]: (state) => {
			return {
				...state,
				requestInAir: true
			};
		},
		[AT.FETCH_LOG.FAILURE]: (state) => {
			return {
				...state,
				requestInAir: false
			};
		},
		[AT.FETCH_LOG.SUCCESS]: (state, action) => {
			let isLastLogReceived = get('meta.isLastLogFetch', action);

			if (state.logText !== '...') {
				return {
					...state,
					logText: process.env.REACT_APP_WITH_JSON_SERVER
						? get(`payload.log`, action)
						: get(`payload`, action),
					isLastLogReceived,
					requestInAir: false
				};
			} else {
				return {
					...state,
					logText: process.env.REACT_APP_WITH_JSON_SERVER
						? get(`payload.log`, action)
						: get(`payload`, action),
					fetchLogFinished: true,
					isLastLogReceived,
					requestInAir: false
				};
			}
		},
		[AT.FETCH_LOG_SIZE.SUCCESS]: (state, action) => {
			return {
				...state,
				fetchLogSizeFinished: true,
				logFileSize: get(`payload.size`, action)
			};
		},
		[AT.IS_PAGE_ACTIVE.SUCCESS]: (state, action) => {
			let isFirstPageActiveStatusReceived = get('meta.isFirstPageActiveFetch', action);

			return {
				...state,
				isActive: get(`payload.active`, action),
				isFirstPageActiveStatusReceived
			};
		},
		[AT.HIDE_LOG]: () => {
			return {
				...initialState
			};
		},
		[AT.SHOW_LOG_MODAL]: (state) => {
			return {
				...state,
				showLogModal: true
			};
		},
		[AT.SHOW_LOG_WARNING_DIALOG]: (state) => {
			return {
				...state,
				showLogWarningDialog: true
			};
		},
		[AT.CHANGE_LOG_SCROLL_VALUE]: (state, action) => {
			return {
				...state,
				enableScrollDown: get('payload.value', action)
			};
		},
		[AT.FETCH_PROGRESS_STEPS.SUCCESS]: (state, action) => {
			return {
				...state,
				progressSteps: get(`payload.progress_steps`, action),
				fetchProgressStepsFinished: true
			};
		},
		[AT.STEP_IS_CLICKED]: (state, action) => {
			return {
				...state,
				clickedStepValue: get(`payload.step`, action)
			};
		},
		[AT.GET_LOG_TEXT]: (state) => {
			return {
				...state,
				downloadLogText: JSON.stringify(state.logText).replace(/\\n|\\r/g, '\n')
			};
		},
		[AT.CLEAR_DOWNLOAD_LOG_TEXT]: (state) => {
			return {
				...state,
				downloadLogText: ''
			};
		},
		[AT.PROGRESS_STEPS_MAP_READY]: (state) => {
			return {
				...state,
				progressStepsMapIsReady: true
			};
		},
		[AT.REPLACE_LOG_MODAL_WITH_LOG_WARNING_DIALOG]: (state) => {
			return {
				...state,
				showLogModal: false,
				showLogWarningDialog: true
			};
		}
	},
	initialState
);

export default logReducer;
