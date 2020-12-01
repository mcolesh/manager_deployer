import { CLEAR_PAGES_DATA, MULTIPLE_API_REQUEST, SESSION_EXPIRED } from '../constants/action-types';
import { get } from 'lodash/fp';
import { API_VERSION } from 'constants/app-constants';
import {
	PAYMENT_REQUIRED,
	NOT_FOUND_ERROR,
	SERVER_ERROR,
	UNAUTHORIZED_ERROR
} from '../constants/server-response-code';

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
		meta: action.meta,
		urls: action.payload.urls ? action.payload.urls : null
	});

const sessionExpiredHandler = (dispatch) =>
	dispatch({
		type: SESSION_EXPIRED
	});

const clearPagesData = (dispatch) =>
	dispatch({
		type: CLEAR_PAGES_DATA
	});

const multipleApiMiddleware = ({ dispatch, getState }) => (next) => (action) => {
	if (action.type !== MULTIPLE_API_REQUEST) {
		return next(action);
	}

	let promises = [];

	dispatch({ type: action.payload.nextActionType.PENDING, meta: action.meta });

	action.meta = {
		...action.meta,
		headers: {
			'Content-type': 'application/json',
			Accept: `application/vnd.cbis.v${API_VERSION}+json`
		}
	};

	action.payload.urls.forEach((url) => {
		promises.push(
			window.fetch(url, action.meta).then((res) => {
				const contentType = res.headers.get('content-type');
				switch (contentType) {
					case 'application/json; charset=utf-8':
					case 'application/json':
						return res.json();

					case 'application/octet-stream':
						return res.text();

					default:
						return res;
				}
			})
		);
	});

	Promise.all(promises)
		.then((values) => {
			const firstReqStatus = get('1.status', values);
			const promiseVal = get('0.error_message', values);
			if (promiseVal) {
				throw promiseVal;
			}
			if (firstReqStatus === SERVER_ERROR || firstReqStatus === NOT_FOUND_ERROR) {
				throw Error(get('0.statusText', values));
			}
			return values;
		})
		.then((payload) => successHandler(dispatch, action, payload))
		.catch((error) => {
			if (
				error.response &&
				(error.response.status === UNAUTHORIZED_ERROR || error.response.status === PAYMENT_REQUIRED)
			) {
				sessionExpiredHandler(dispatch);
				clearPagesData(dispatch);
			}
			return errorHandler(dispatch, action, error);
		});
};
export default multipleApiMiddleware;
