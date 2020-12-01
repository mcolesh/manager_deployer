import { isEmpty } from 'lodash/fp';
import { REGEX } from 'constants/app-captions.js';

export const regexValidator = ({ validation }, text) => {
	if (Array.isArray(text)) {
		let valid = true;
		text.forEach((t) => {
			if (new RegExp(validation).test(t)) {
				valid = false;
			}
		});
		return !isEmpty(text) && valid && REGEX;
	} else {
		return !isEmpty(text) && !new RegExp(validation).test(text) && REGEX;
	}
};
