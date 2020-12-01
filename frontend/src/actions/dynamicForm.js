import * as AT from '../constants/action-types';

export const setFieldsErrors = (fieldPathToErrorsMap) => {
	return {
		type: AT.SET_FIELDS_ERRORS,
		payload: { fieldPathToErrorsMap }
	};
};

export default setFieldsErrors;
