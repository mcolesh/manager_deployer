module.exports = function (req, res, next) {
	if (req.method === 'POST') {
		// Converts POST to GET and move payload to query params
		// This way it will make JSON Server that it's GET requesti

		if (req.url === '/installation_main' || req.url === '/installation_status') {
			req.url += `_${req.body.hardware}`;
		}

		req.method = 'GET';
		req.query = req.body;
	}
	if (req.url !== '/login' && req.url !== '/logout' && req.url !== '/manager_product_type') {
		if (req.headers.cookie === undefined || !req.headers.cookie.includes('manager_token')) {
			res.status(402);
		}
	}

	if (req.url === '/login') {
		switch (req.headers.authorization) {
			// server credentials were accepted (us/pass: cbis-admin/password)
			case 'Basic Y2Jpcy1hZG1pbjpwYXNzd29yZA==':
				res.cookie('manager_token', 'Y2Jpcy1hZG1pbjpwYXNzd29yZA', { maxAge: 60 * 60 * 1000 });
				break;
			// server is rebooting (un/pass: reboot_usecase_e2e/password)
			case 'Basic cmVib290X3VzZWNhc2VfZTJlOnBhc3N3b3Jk':
				res.status(500).jsonp({
					errorMessage: 'The server is temporarily unavailable.Please try again later'
				});
				break;
			default:
				// server credentials were rejected
				res.status(402);
				break;
		}
	}

	if (req.url === '/logout') {
		res.clearCookie('manager_token');
	}
	next();
};
