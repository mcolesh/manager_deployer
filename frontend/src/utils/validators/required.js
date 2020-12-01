import { isEmpty } from 'lodash/fp';
import { REQUIRED_VALIDATOR } from 'constants/app-captions';
export const requiredValidator = ({ required = false }, text = '', existingIps = '') => {
	if (existingIps.length > 0) {
		return false;
	}

	let notValid = false;
	if (Array.isArray(text)) {
		notValid = text.length === 0;
	} else {
		notValid = text === null || isEmpty(text.toString());
	}
	return required && notValid && REQUIRED_VALIDATOR;
};
