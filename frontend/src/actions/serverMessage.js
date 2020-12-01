import * as AT from 'constants/action-types';
import * as AU from 'constants/api-urls';

export const fetchServerMessage = () => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: AU.FETCH_SERVER_STATUS,
			nextActionType: AT.FETCH_SERVER_MESSAGE
		}
	};
};
