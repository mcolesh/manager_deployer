import { createSelector } from 'reselect';
import { get } from 'lodash/fp';
import { SERVER_STATUS } from 'constants/app-constants';

export const getServerStatus = (state) => get(['serverMessage', 'messageStatus'], state);

export const isServerRebooting = createSelector(getServerStatus, (serverStatus) => {
	return serverStatus === SERVER_STATUS.SHUTTING_DOWN;
});
