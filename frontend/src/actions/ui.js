import * as AT from 'constants/action-types';
import { FETCH_PRODUCT_TYPE, FETCH_USER_INFO } from 'constants/api-urls';

export const hidePrequisiteModal = () => {
	return {
		type: AT.HIDE_PREQUISITE_MODAL,
		payload: {}
	};
};

export const fetchProductType = () => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: FETCH_PRODUCT_TYPE,
			nextActionType: AT.FETCH_PRODUCT_TYPE
		}
	};
};

export const fetchUserInfo = () => {
	return {
		type: AT.API_REQUEST,
		payload: {
			url: FETCH_USER_INFO,
			nextActionType: AT.FETCH_USER_INFO
		}
	};
};
