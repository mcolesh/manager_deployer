import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { reducer } from 'redux-storage';
import pagesData from 'reducers/pages';
import wizard from 'reducers/wizard';
import { dynamic, dynamicForm } from 'reducers/dynamicForm';
import { prerequisites, prerequisitesForm } from 'reducers/prerequisitesForm';
import externalLinks from 'reducers/externalLinks';
import log from 'reducers/log';
import report from 'reducers/report';
import ui from 'reducers/ui';
import auth from 'reducers/auth';
import serverMessage from 'reducers/serverMessage';
import plugins from 'reducers/plugins';
import { tempFields, tempFieldsForm } from 'reducers/tempFieldsForm';
import * as AT from 'constants/action-types';

const appReducer = (history) =>
	combineReducers({
		router: connectRouter(history),
		pagesData,
		externalLinks,
		wizard,
		dynamic,
		dynamicForm,
		prerequisites,
		prerequisitesForm,
		tempFields,
		tempFieldsForm,
		log,
		report,
		ui,
		auth,
		serverMessage,
		plugins
	});

const rootReducer = (history) => (state, action) => {
	let newState = state;
	// on logout redux store returns back to it's initial state
	// notice: reducers return to their init state when called with undefined as first argument
	if (action.type === AT.LOGOUT) {
		newState = undefined;
	}

	return reducer(appReducer(history))(newState, action);
};

export default rootReducer;
