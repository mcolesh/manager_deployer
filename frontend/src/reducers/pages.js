import { handleActions } from 'redux-actions';
import { get } from 'lodash/fp';
import * as AT from 'constants/action-types';
import { DEFAULT_MAX_LOG_SIZE } from 'constants/app-constants';

const initialState = {
	pages: [],
	pagesStates: new Map(),
	debug: false,
	successfulDeployment: false,
	deployedWizardName: '',
	selectedCategoryIndex: 0,
	confirmationMsg: '',
	isExamplesCategoryVisible: false,
	isToggleActivated: false,
	fetchPagesError: false,
	clientJsonValidation: false,
	fetchPagesSuccess: false,
	cbisVersion: '',
	maxLogFileSize: DEFAULT_MAX_LOG_SIZE
};

const pagesReducer = handleActions(
	{
		[AT.FETCH_PAGES.PENDING]: (state) => {
			return state;
		},
		[AT.FETCH_PAGES.SUCCESS]: (state, action) => {
			return {
				...state,
				pages: get(`payload.pages`, action),
				debug: get(`payload.debug`, action),
				confirmationMsg: get(`payload.confirmationMsg`, action),
				cbisVersion: get(`payload.version`, action),
				fetchPagesSuccess: true
			};
		},
		[AT.FETCH_PAGES.FAILURE]: (state) => {
			return {
				...state,
				categories: [],
				debug: false,
				confirmationMsg: '',
				fetchPagesSuccess: false
			};
		},
		[AT.SUCCESSFUL_DEPLOYMENT]: (state, action) => {
			return {
				...state,
				successfulDeployment: true,
				deployedWizardName: action.payload.wizardName
			};
		},
		[AT.CLEAR_WIZARD_AFTER_DEPLOYMENT]: (state) => {
			return {
				...state,
				successfulDeployment: false,
				deployedWizardName: ''
			};
		},
		[AT.CLEAR_PAGES_DATA]: (state) => {
			return {
				...state,
				fetchPagesError: false,
				fetchPagesSuccess: false
			};
		},
		'@@router/LOCATION_CHANGE': (state, action) => {
			if (get('payload.location.pathname', action) === '/dashboard') {
				return {
					...state,
					categories: []
				};
			}
			return { ...state };
		}
	},
	initialState
);

export default pagesReducer;
