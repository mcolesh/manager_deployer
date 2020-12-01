import { handleActions } from 'redux-actions';
import { flow, set } from 'lodash/fp';
import * as AT from '../constants/action-types';

const initialState = {
	components: [],
	pending: false
};

const externalLinksReducer = handleActions(
	{
		[AT.FETCH_COMPONENTS.PENDING]: (state, action) => {
			return { ...state, pending: true };
		},
		[AT.FETCH_COMPONENTS.SUCCESS]: (state, action) => {
			return flow([set('components', action.payload.components), set('pending', false)])(state);
		},
		[AT.FETCH_COMPONENTS.FAILURE]: (state, action) => {
			return { ...state, pending: false };
		}
	},
	initialState
);

export default externalLinksReducer;
