import * as AT from 'constants/action-types';
import * as API from 'constants/api-urls';

export const showPluginModal = () => {
	return {
		type: AT.SHOW_PLUGIN_MODAL,
		payload: {}
	};
};

export const hidePluginModal = () => {
	return {
		type: AT.HIDE_PLUGIN_MODAL,
		payload: {}
	};
};

export const fetchPlugins = () => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: API.FETCH_PLUGINS,
			nextActionType: AT.FETCH_PLUGINS
		}
	};
};

export const showUploadPluginModal = () => {
	return {
		type: AT.SHOW_UPLOAD_PLUGIN_MODAL,
		payload: {}
	};
};

export const hideUploadPluginModal = () => {
	return {
		type: AT.HIDE_UPLOAD_PLUGIN_MODAL,
		payload: {}
	};
};

export const storeFileToUpload = (file) => {
	return {
		type: AT.STORE_FILE,
		payload: { file }
	};
};

export const uploadFile = (file) => {
	return {
		type: AT.API_REQUEST,
		meta: {
			method: 'POST',
			data: file,
			headers: {
				'Content-type': file.type,
				'X-FILENAME': file.name
			}
		},
		payload: {
			url: API.UPLOAD_FILE_URL,
			nextActionType: AT.UPLOAD_FILE
		}
	};
};

export const uploadFileName = (file) => {
	return {
		type: AT.API_REQUEST,
		meta: {
			method: 'POST',
			data: JSON.stringify({ name: file.name })
		},
		payload: {
			url: API.UPLOAD_FILE_NAME_URL,
			nextActionType: AT.UPLOAD_FILE_NAME
		}
	};
};

export const deletePlugin = (file) => {
	return {
		type: AT.API_REQUEST,
		meta: {
			method: 'Delete'
		},
		payload: {
			url: API.UPLOAD_FILE_NAME_URL + '?name=' + file.name,
			nextActionType: AT.DELETE_PLUGIN
		}
	};
};

export const uploadFailed = () => {
	return {
		type: AT.UPLOAD_FAILED,
		payload: {}
	};
};
