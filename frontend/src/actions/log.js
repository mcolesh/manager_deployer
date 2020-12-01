import * as AT from 'constants/action-types';

export const storeLogParams = (pageName, logUrl, displayName) => {
	return {
		type: AT.STORE_PAGE_LOG_PARAMS,
		payload: { pageName, logUrl, displayName }
	};
};

export const isPageActive = (url, isFirstPageActiveFetch = false) => {
	return {
		type: AT.API_REQUEST,
		meta: {
			isFirstPageActiveFetch
		},
		payload: {
			url,
			nextActionType: AT.IS_PAGE_ACTIVE
		}
	};
};

export const fetchLogSize = (logUrl) => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: `/api/get_log_size?name=${logUrl}`,
			nextActionType: AT.FETCH_LOG_SIZE
		}
	};
};

export const fetchLog = (logUrl = '', isLastLogFetch = false) => {
	return {
		type: AT.API_REQUEST,
		meta: {
			responseType: 'stream',
			isLastLogFetch
		},
		payload: {
			url: logUrl,
			nextActionType: AT.FETCH_LOG
		}
	};
};

export const hideLog = () => {
	return {
		type: AT.HIDE_LOG
	};
};

export const showLogModal = () => {
	return {
		type: AT.SHOW_LOG_MODAL,
		payload: {}
	};
};

export const showLogWarningDialog = () => {
	return {
		type: AT.SHOW_LOG_WARNING_DIALOG,
		payload: {}
	};
};

export const changeScrollValue = (value) => {
	return {
		type: AT.CHANGE_LOG_SCROLL_VALUE,
		payload: { value }
	};
};

export const fetchProgressSteps = (pageName) => {
	return {
		type: AT.API_REQUEST,
		meta: { pageName },
		payload: {
			url: `api/${pageName}/progress`,
			nextActionType: AT.FETCH_PROGRESS_STEPS
		}
	};
};

export const storeProgressInSteps = () => {
	return {
		type: AT.STORE_PROGRESS_IN_STEPS,
		payload: {}
	};
};

export const stepClicked = (step) => {
	return {
		type: AT.STEP_IS_CLICKED,
		payload: { step }
	};
};

export const getLogText = () => {
	return {
		type: AT.GET_LOG_TEXT,
		payload: {}
	};
};

export const clearDownloadLogText = () => {
	return {
		type: AT.CLEAR_DOWNLOAD_LOG_TEXT,
		payload: {}
	};
};

export const progressStepsMapReady = () => {
	return {
		type: AT.PROGRESS_STEPS_MAP_READY,
		payload: {}
	};
};

export const hideErrorDialog = () => ({
	type: AT.HIDE_ERROR_DIALOG,
	payload: {}
});

export const replaceLogModalWithLogWarningDialog = () => ({
	type: AT.REPLACE_LOG_MODAL_WITH_LOG_WARNING_DIALOG,
	payload: {}
});
