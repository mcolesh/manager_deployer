import { modelReducer, formReducer } from 'react-redux-form';

const initialState = {
	prerequisites: {}
};

export const prerequisites = modelReducer('prerequisites', initialState);
export const prerequisitesForm = formReducer('prerequisites', initialState);
