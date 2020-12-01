import { API_VERSION } from 'constants/app-constants';
export const METHOD = {
	GET: 'GET',
	DELETE: 'DELETE',
	HEAD: 'HEAD',
	OPTIONS: 'OPTIONS',
	POST: 'POST',
	PUT: 'PUT',
	PATCH: 'PATCH',
	LINK: 'LINK',
	UNLINK: 'UNLINK'
};

// Properties definitions of API request configuration can be found here:
// https://github.com/axios/axios under 'Request Config' topic.
export const requestConfig = {
	url: undefined,
	method: METHOD.GET, // default
	baseURL: undefined,
	transformRequest: undefined,
	transformResponse: undefined,
	headers: {
		'Content-type': 'application/json',
		Authorization: `Basic`,
		Accept: `application/vnd.cbis.v${API_VERSION}+json`
	},
	params: {},
	paramsSerializer: undefined,
	data: {},
	timeout: 0, // default is `0` (no timeout)
	timeoutErrorMessage: '',
	withCredentials: false, // default
	adapter: undefined,
	auth: undefined,
	responseType: 'json', // default
	responseEncoding: 'utf8', // default
	// xsrfCookieName: 'XSRF-TOKEN', // default
	// xsrfHeaderName: 'X-XSRF-TOKEN', // default
	onUploadProgress: undefined,
	onDownloadProgress: undefined,
	maxContentLength: undefined,
	maxBodyLength: undefined,
	validateStatus: function (status) {
		return (
			(status >= 200 && status < 300) ||
			status === 304 ||
			status === 400 ||
			status === 402 ||
			status === 404 ||
			status === 500
		); // default
	},
	maxRedirects: 5, // default
	socketPath: null, // default
	httpAgent: undefined,
	httpsAgent: undefined,
	proxy: undefined,
	cancelToken: undefined,
	decompress: true // default,
};
