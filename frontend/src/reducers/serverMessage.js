import { handleActions } from 'redux-actions';
import * as AT from 'constants/action-types';

const initialState = {
	messageStatus: '',
	messageContent: ''
};

const serverMessageReducer = handleActions(
	{
		[AT.FETCH_SERVER_MESSAGE.PENDING]: (state) => {
			return state;
		},
		[AT.FETCH_SERVER_MESSAGE.SUCCESS]: (state, action) => {
			return {
				...state,
				messageContent: action.payload.message,
				messageStatus: action.payload.status
			};
		},
		[AT.FETCH_SERVER_MESSAGE.FAILURE]: (state) => {
			return state;
		}
	},
	initialState
);

export default serverMessageReducer;
