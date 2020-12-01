import * as CAPTIONS from 'constants/app-captions';
import * as SERVER_RESPONSE_CODE from 'constants/server-response-code';
import { requestConfig } from 'constants/api-config';
import { cloneDeep } from 'lodash/fp';
import axios from 'axios';
import { push } from 'connected-react-router';
import { AUTH_REQUEST, LOGOUT, CLEAR_PAGES_DATA } from '../constants/action-types';

const successHandler = (dispatch, action, payload) =>
	dispatch({
		type: action.payload.nextActionType.SUCCESS,
		payload,
		meta: action.meta
	});

const clearPagesData = (dispatch) =>
	dispatch({
		type: CLEAR_PAGES_DATA
	});

const errorHandler = (dispatch, action, error) =>
	dispatch({
		type: action.payload.nextActionType.FAILURE,
		error,
		meta: action.meta
	});

const getErrorMessage = (status, data) => {
	switch (status) {
		case SERVER_RESPONSE_CODE.NOT_FOUND_ERROR:
			return CAPTIONS.LOGIN_404_ERROR;
		case SERVER_RESPONSE_CODE.UNAUTHORIZED_ERROR:
		case SERVER_RESPONSE_CODE.PAYMENT_REQUIRED:
			return CAPTIONS.LOGIN_401_ERROR;
		case SERVER_RESPONSE_CODE.SERVER_ERROR:
			return data.errorMessage;
		default:
			return CAPTIONS.LOGIN_GENERAL_ERROR;
	}
};

const authMiddleware = ({ dispatch }) => (next) => (action) => {
	if (action.type !== AUTH_REQUEST && action.type !== LOGOUT) {
		return next(action);
	}

	if (action.type === LOGOUT) {
		// erase session data and redirect the user back to the login page
		push('/login');
		return next(action);
	}

	dispatch({
		type: action.payload.nextActionType.PENDING,
		meta: action.meta,
		payload: { username: action.payload.username }
	});

	// merge default-request-configurations with request data
	const request = Object.assign(cloneDeep(requestConfig), action.meta, { url: action.payload.url });

	return axios(request)
		.then((response) => {
			const contentType = response.headers['content-type'];
			if (response.status !== 200) {
				switch (contentType) {
					case 'application/json':
					case 'application/json; charset=utf-8':
					case 'text/html':
						throw Error(getErrorMessage(response.status, response.data));
					default:
						throw Error(CAPTIONS.LOGIN_GENERAL_ERROR);
				}
			}
			return response.data;
		})
		.then((payload) => {
			clearPagesData(dispatch);
			return successHandler(dispatch, action, payload);
		})
		.catch((error) => errorHandler(dispatch, action, error));
};

export default authMiddleware;
