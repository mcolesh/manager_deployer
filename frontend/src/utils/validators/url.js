import { isEmpty } from 'lodash/fp';
import { INVALID_URL } from 'constants/app-captions.js';

export const urlValidator = (props, text) => {
	let valid = true;
	try {
		new URL(text);
	} catch (e) {
		valid = false;
	}

	return !isEmpty(text) && !valid && INVALID_URL;
};

export default urlValidator;
