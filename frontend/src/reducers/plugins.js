import { handleActions } from 'redux-actions';
import { get } from 'lodash/fp';
import * as AT from 'constants/action-types';

const initialState = {
	showPluginModal: false,
	showUploadPluginModal: false,
	startedUpload: false,
	deleteStarted: false,
	file: {},
	status: '',
	error: '',
	plugins: []
};

const pluginReducer = handleActions(
	{
		[AT.SHOW_PLUGIN_MODAL]: (state, action) => {
			return { ...state, showPluginModal: true };
		},
		[AT.HIDE_PLUGIN_MODAL]: (state, action) => {
			return { ...state, showPluginModal: false };
		},
		[AT.FETCH_PLUGINS.PENDING]: (state) => {
			return state;
		},
		[AT.FETCH_PLUGINS.SUCCESS]: (state, action) => {
			return {
				...state,
				plugins: action.payload.plugins,
				showPluginModal: true,
				startedUpload: false
			};
		},
		[AT.FETCH_PLUGINS.FAILURE]: (state) => {
			return state;
		},
		[AT.SHOW_UPLOAD_PLUGIN_MODAL]: (state, action) => {
			return { ...state, showUploadPluginModal: true, showPluginModal: false };
		},
		[AT.HIDE_UPLOAD_PLUGIN_MODAL]: (state, action) => {
			return {
				...state,
				showUploadPluginModal: false,
				status: '',
				error: '',
				showPluginModal: true
			};
		},
		[AT.STORE_FILE]: (state, action) => {
			const fileToUpload = get(`payload.file.0`, action);
			return {
				...state,
				file: fileToUpload,
				status: ''
			};
		},
		[AT.UPLOAD_FILE.PENDING]: (state) => {
			return { ...state, startedUpload: true };
		},
		[AT.UPLOAD_FILE.SUCCESS]: (state, action) => {
			return { ...state };
		},
		[AT.UPLOAD_FILE.FAILURE]: (state) => {
			return state;
		},
		[AT.UPLOAD_FILE_NAME.PENDING]: (state) => {
			return {
				...state,
				status: '',
				error: ''
			};
		},
		[AT.UPLOAD_FILE_NAME.SUCCESS]: (state, action) => {
			return { ...state, status: action.payload.status };
		},
		[AT.UPLOAD_FILE_NAME.FAILURE]: (state, action) => {
			return {
				...state,
				status: get('error.status', action),
				error: get('error.error', action)
			};
		},
		[AT.DELETE_PLUGIN.PENDING]: (state) => {
			return {
				...state,
				deleteStarted: true
			};
		},
		[AT.DELETE_PLUGIN.SUCCESS]: (state, action) => {
			return {
				...state,
				deleteStarted: false
			};
		},
		[AT.DELETE_PLUGIN.FAILURE]: (state) => {
			return state;
		},
		[AT.UPLOAD_FAILED]: (state) => {
			return { ...state, startedUpload: false };
		}
	},
	initialState
);

export default pluginReducer;
