import { modelReducer, formReducer } from 'react-redux-form';

const initialState = {
	fields: {}
};

export const tempFields = modelReducer('tempFields', initialState);
export const tempFieldsForm = formReducer('tempFields', initialState);
