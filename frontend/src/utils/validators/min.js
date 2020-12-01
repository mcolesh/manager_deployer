export const minValidator = ({ restrictions }, value) => {
	if (restrictions && !isNaN(restrictions.min) && value < restrictions.min) {
		return true && `Field is below required minimum (${restrictions.min})`;
	}
	return false;
};
