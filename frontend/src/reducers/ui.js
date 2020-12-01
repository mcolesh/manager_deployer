import { handleActions } from 'redux-actions';
import * as AT from '../constants/action-types';
import { get } from 'lodash/fp';

const initialState = {
	showPrerequisiteModal: false,
	blockUI: false,
	productTypeInfo: {},
	fetchProductTypeFinished: false,
	username: '',
	isReconnectionSuccessful: false
};

const uiReducer = handleActions(
	{
		[AT.FETCH_WIZARD_PREREQUISITES.SUCCESS]: (state) => {
			return { ...state, showPrerequisiteModal: true };
		},
		[AT.FETCH_WIZARD.PENDING]: (state) => {
			return { ...state, blockUI: true };
		},
		[AT.FETCH_WIZARD.SUCCESS]: (state) => {
			return { ...state, showPrerequisiteModal: false, blockUI: false };
		},
		[AT.FETCH_WIZARD.FAILURE]: (state) => {
			return { ...state, showPrerequisiteModal: false, blockUI: false };
		},
		[AT.HIDE_PREQUISITE_MODAL]: (state) => {
			return { ...state, showPrerequisiteModal: false };
		},
		[AT.FETCH_PRODUCT_TYPE.PENDING]: (state) => {
			return state;
		},
		[AT.FETCH_PRODUCT_TYPE.SUCCESS]: (state, action) => {
			return {
				...state,
				productTypeInfo: get(`payload`, action),
				fetchProductTypeFinished: true
			};
		},
		[AT.FETCH_PRODUCT_TYPE.FAILURE]: (state) => {
			return {
				...state,
				fetchProductTypeFinished: true
			};
		},
		[AT.FETCH_USER_INFO.PENDING]: (state) => {
			return state;
		},
		[AT.FETCH_USER_INFO.SUCCESS]: (state, action) => {
			return {
				...state,
				username: get(`payload.username`, action),
				fetchUserInfoFinished: true
			};
		},
		[AT.FETCH_USER_INFO.FAILURE]: (state) => {
			return state;
		},
		[AT.VALIDATE_HTTP_COOKIE]: (state) => {
			return {
				...state,
				isReconnectionSuccessful: true
			};
		}
	},

	initialState
);

export default uiReducer;
