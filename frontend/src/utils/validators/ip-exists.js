export const ipExistsValidator = ({ validation }, text, existingIps) => {
	let invalid = false;
	if (existingIps) {
		const Ips = Array.isArray(existingIps) ? existingIps : existingIps.split(',');

		Ips.forEach((ip) => {
			if (text === ip) invalid = true;
		});
	}
	return invalid && 'Value already exists';
};
