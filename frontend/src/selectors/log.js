import { createSelector } from 'reselect';
import { get } from 'lodash/fp';

export const getPagesData = (state) => get(['pagesData'], state);

export const getLog = (state) => get(['log'], state);

export const isLogSizeExceedsMaxLogSize = createSelector(getPagesData, getLog, (pagesData, log) => {
	if (log.logFileSize === undefined || pagesData.maxLogFileSize === undefined) {
		return false;
	}

	return log.logFileSize > pagesData.maxLogFileSize;
});
