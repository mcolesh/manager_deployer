import { Address4, Address6 } from 'ip-address';

const isValid = (validation, text) => {
	let valid = false;
	if (
		(validation.ipv4 && !validation.ipv6) ||
		(validation.ipv6 === false && validation.ipv4 === undefined)
	)
		valid = new Address4(text).isValid();
	else if (
		(validation.ipv6 && !validation.ipv4) ||
		(validation.ipv4 === false && validation.ipv6 === undefined)
	) {
		valid = new Address6(text).isValid();
	} else {
		valid = new Address6(text).isValid() || new Address4(text).isValid();
	}
	valid = valid && text.indexOf('/') === -1; // "cidr" is not allowed on IP type
	return !valid && text.length > 0;
};

export const ipValidator = (validation, value, existingIps, isMultiple = true) => {
	let valid = true;
	const text = value === undefined || value === null ? '' : value;
	if (!isMultiple) {
		valid = isValid(validation, text);
		return valid && 'IP Invalid';
	}
	if (isMultiple && text.length > 0) {
		const textArray = Array.isArray(text) ? text : text.split(',');
		textArray.forEach((t) => {
			if (!isValid(validation, t)) {
				valid = false;
			}
		});
		return valid && 'IP Invalid';
	}
	return false;
};
