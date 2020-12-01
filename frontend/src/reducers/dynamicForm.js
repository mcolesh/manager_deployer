import { modelReducer, formReducer } from 'react-redux-form';
import * as AT from 'constants/action-types';
import { setFieldsErrors, setFormValidity } from 'utils/wizard';
import { cloneDeep, set } from 'lodash/fp';
import { handleActions } from 'redux-actions';

const initialState = {
	content: {}
};

// 'extendedDynamicForm' reducer expends react-redux-form API to support:
// (1) setErrors for multiple-fields at once
// (2) async-avalidation fields.
const extendedDynamicForm = handleActions(
	{
		[AT.SET_FIELDS_ERRORS]: (state, action) => {
			const { fieldPathToErrorsMap } = action.payload;
			const newDynamicForm = setFieldsErrors(state, fieldPathToErrorsMap);
			return newDynamicForm;
		},
		'rrf/setErrors': (state, action) => {
			if (!action.model.startsWith('dynamic.content')) {
				return state;
			}
			let newDynamicForm = cloneDeep(state);
			const validatedForm = setFormValidity('content', newDynamicForm);
			newDynamicForm = set('$form.valid', validatedForm.valid, validatedForm.newDynamicForm);
			return newDynamicForm;
		}
	},
	initialState
);

export const dynamic = modelReducer('dynamic', initialState);
export const dynamicForm = (state, action) => {
	return extendedDynamicForm(formReducer('dynamic', initialState)(state, action), action);
};
