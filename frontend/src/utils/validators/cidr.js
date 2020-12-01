import { Address4, Address6 } from 'ip-address';
import { isEmpty } from 'lodash/fp';

export const cidrValidator = ({ validation }, text = '') => {
	const clazz = new Address4(text).valid ? Address4 : Address6;
	const address = new clazz(text);

	// error when address equals the address without the suffix (i.e. 8.8.8.8)
	return (
		!isEmpty(text) &&
		(!address.valid || address.address === address.addressMinusSuffix) &&
		'CIDR is invalid'
	);
};
