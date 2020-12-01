import * as AT from 'constants/action-types';

export const fetchReport = (url) => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url,
			nextActionType: AT.SHOW_REPORT
		}
	};
};

export const hideReport = () => {
	return {
		type: AT.HIDE_REPORT,
		payload: {}
	};
};

export const hideReportErrorDialog = () => {
	return {
		type: AT.HIDE_REPORT_ERROR_DIALOG,
		payload: {}
	};
};
