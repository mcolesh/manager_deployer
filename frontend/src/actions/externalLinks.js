import * as AT from '../constants/action-types';

export const fetchComponents = () => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: '/api/components/getComponents',
			nextActionType: AT.FETCH_COMPONENTS
		}
	};
};
