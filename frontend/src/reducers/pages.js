import { handleActions } from 'redux-actions';
import { get } from 'lodash/fp';
import * as AT from 'constants/action-types';
import { DEFAULT_MAX_LOG_SIZE } from 'constants/app-constants';

const initialState = {
	pages: [],
	pagesStatus: new Map(),
	fetchPagesStatusSuccess: false,
	successfulDeployment: false,
	deployedWizardName: '',
	selectedCategoryIndex: 0,
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
				fetchPagesSuccess: true
			};
		},
		[AT.FETCH_PAGES.FAILURE]: (state) => {
			return {
				...state,
				categories: [],
				fetchPagesSuccess: false
			};
		},
		[AT.FETCH_PAGES_STATUS.PENDING]: (state) => {
			return state;
		},
		[AT.FETCH_PAGES_STATUS.SUCCESS]: (state, action) => {
			const pagesStatus = new Map();
			get('payload.pages_status', action).forEach((el) => {
				pagesStatus.set(`${el.name}`, {
					status: el.status,
					display: el.display
				});
			});
			return {
				...state,
				pagesStatus
			};
		},
		[AT.FETCH_PAGES_STATUS.FAILURE]: (state) => {
			return {
				...state,
				fetchPagesStatusSuccess: false
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
