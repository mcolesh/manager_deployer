import * as AT from 'constants/action-types';
import { API_VERSION } from 'constants/app-constants';

export const login = (username, credentials) => {
	return {
		type: AT.AUTH_REQUEST,
		meta: {
			headers: {
				Authorization: `Basic ${credentials}`,
				'Content-type': 'application/json',
				Accept: `application/vnd.cbis.v${API_VERSION}+json`
			}
		},
		payload: {
			url: '/api/login',
			nextActionType: AT.LOGIN,
			username
		}
	};
};

export const logout = () => {
	return {
		type: AT.AUTH_REQUEST,
		payload: {
			url: '/api/logout',
			nextActionType: AT.LOGOUT
		}
	};
};
