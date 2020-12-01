import { API_REQUEST, SESSION_EXPIRED, VALIDATE_HTTP_COOKIE } from 'constants/action-types';
import { requestConfig } from 'constants/api-config';
import { cloneDeep, getOr } from 'lodash/fp';
import axios from 'axios';
import {
	PAYMENT_REQUIRED,
	SERVER_ERROR,
	UNAUTHORIZED_ERROR
} from '../constants/server-response-code';

import { CLEAR_PAGES_DATA } from '../constants/action-types';

const pendingHandler = (dispatch, action) =>
	dispatch({
		type: action.payload.nextActionType.PENDING,
		meta: action.meta
	});

const eventHandler = (dispatch, action, payload) =>
	dispatch({
		type: action.payload.nextActionType.EVENT,
		payload,
		meta: action.meta
	});

const successHandler = (dispatch, action, payload) =>
	dispatch({
		type: action.payload.nextActionType.SUCCESS,
		payload,
		meta: action.meta
	});

const errorHandler = (dispatch, action, error) =>
	dispatch({
		type: action.payload.nextActionType.FAILURE,
		error,
		meta: action.meta
	});

const sessionExpiredHandler = (dispatch) =>
	dispatch({
		type: SESSION_EXPIRED
	});

const clearPagesData = (dispatch) =>
	dispatch({
		type: CLEAR_PAGES_DATA
	});

const validateHttpCookie = (dispatch) =>
	dispatch({
		type: VALIDATE_HTTP_COOKIE
	});

const apiMiddleware = ({ dispatch }) => (next) => (action) => {
	if (action.type !== API_REQUEST) {
		return next(action);
	}

	pendingHandler(dispatch, action);

	// update headers with credentials
	action.meta = {
		...action.meta,
		headers: {
			...requestConfig.headers,
			...getOr({}, 'meta.headers', action)
		}
	};
	const { CancelToken } = axios;
	const source = CancelToken.source();
	// add an eventListener, if needed
	if (action.meta.onUploadProgress) {
		action.meta.onUploadProgress = function (progressEvent) {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			eventHandler(dispatch, action, { percentCompleted, source });
		};
	} else if (action.meta.onDownloadProgress) {
		action.meta.onDownloadProgress = function (progressEvent) {
			const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
			eventHandler(dispatch, action, percentCompleted);
		};
	}

	// merge default-request-configurations with request data
	const request = Object.assign(cloneDeep(requestConfig), action.meta, {
		url: action.payload.url,
		cancelToken: source.token
	});
	return axios(request)
		.then((response) => {
			const contentType = response.headers['content-type'];
			//validate response status
			if (
				response.status === UNAUTHORIZED_ERROR ||
				response.status === SERVER_ERROR ||
				response.status === PAYMENT_REQUIRED
			) {
				const errorObject = { ...response.data, response: { status: response.status } };
				switch (contentType) {
					case 'application/json':
					case 'application/json; charset=utf-8':
						throw errorObject;
					default:
						throw Error(response.statusText);
				}
			}
			// response is valid - status range between 200 and 300
			// notice: response-type is pre-defined in requestConfig.responseType param
			return response.data;
		})
		.then((payload) => {
			validateHttpCookie(dispatch);
			return successHandler(dispatch, action, payload);
		})
		.catch((error) => {
			if (
				error.response &&
				(error.response.status === UNAUTHORIZED_ERROR || error.response.status === PAYMENT_REQUIRED)
			) {
				clearPagesData(dispatch);
				sessionExpiredHandler(dispatch);
			}
			if (!axios.isCancel(error)) {
				return errorHandler(dispatch, action, error);
			}
		});
};

export default apiMiddleware;
