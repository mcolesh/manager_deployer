export const maxValidator = ({ restrictions }, value) => {
	if (restrictions && !isNaN(restrictions.max) && value > restrictions.max) {
		return true && `Field is above required maximum (${restrictions.max})`;
	}
	return false;
};
