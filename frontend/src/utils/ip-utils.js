import { Address4, Address6 } from 'ip-address';

// Workaround to get BigInteger from 'ip-address.js' as it is not public
export const BigInteger = new Address4('0.0.0.0').bigInteger().constructor;

const ONE = (function () {
	const r = new BigInteger();
	r.fromInt(1);
	return r;
})();

export const AddressFamily = (ip) => (new Address4(ip).valid ? Address4 : Address6);

/**
 * Converts a range of IPs (of the form a.b.c.d - x.y.w.z) to individual IPs
 * @param {string} start
 * @param {string} end
 * @return {Array.<string>}
 * @throws Exception if `start` or `end` aren't valid addresses
 * @throws Exception if range is too long (as it can hang the page)
 */
export const createIpList = (start, end) => {
	if (!start) {
		return [];
	}

	const addressFamily = AddressFamily(start);

	const startAsAddress = new addressFamily(start);
	const endAsAddress = new addressFamily(end || start);

	if (!startAsAddress.valid || !endAsAddress.valid) {
		throw new Error(`Error around: ${start}-${end}`);
	}

	const startAsBigInt = startAsAddress.bigInteger();
	const endAsBigInt = endAsAddress.bigInteger();
	const ips = [];

	if (endAsBigInt.subtract(startAsBigInt).intValue() > 1000) {
		throw new Error(`Range is too big. Divide to ranges of less than 1000 addresses`);
	}

	if (endAsBigInt.subtract(startAsBigInt).intValue() < 0) {
		throw new Error(`Range is Wrong. Start ip is greater than End ip`);
	}

	let next_ip = startAsBigInt;
	while (next_ip.compareTo(endAsBigInt) <= 0) {
		ips.push(addressFamily.fromBigInteger(next_ip).address);
		next_ip = next_ip.add(ONE);
	}

	return ips;
};
