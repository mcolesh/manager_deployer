import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import apiMiddleware from 'middlewares/api';
import multipleApiMiddleware from 'middlewares/multipleApi';
import authMiddleware from 'middlewares/auth';
import { routerMiddleware } from 'connected-react-router';
import { reducer } from 'redux-storage';
// import { createMiddleware, createLoader, reducer } from 'redux-storage';
// import createEngine from 'redux-storage-engine-localstorage';
import { createBrowserHistory } from 'history';
// import * as AT from 'constants/action-types';

import rootReducer from 'reducers/root';
/* --- react-redux-storage --- */

/*const engine = createEngine('wizard-nokia');
const storageMiddleware = createMiddleware(
  engine,
  ['@@router/LOCATION_CHANGE'],
  [AT.FETCH_WIZARD.SUCCESS, 'rrf/change', AT.SET_WIZARD_STEP]
);*/

/* --- react-redux-storage --- */

// TODO: add this in DEBUG only (env)
const composeEnhancers =
	typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
		: compose;

export const history = createBrowserHistory();

const middleware =
	process.env.NODE_ENV === `development`
		? [
				createLogger({ collapsed: true }),
				thunk,
				authMiddleware,
				apiMiddleware,
				multipleApiMiddleware,
				routerMiddleware(history)
				/*storageMiddleware*/
		  ]
		: [
				thunk,
				authMiddleware,
				apiMiddleware,
				multipleApiMiddleware,
				routerMiddleware(history)
				/*storageMiddleware*/
		  ];

if (process.env.NODE_ENV === `development`) {
	const freeze = require('redux-freeze');
	middleware.push(freeze);
}

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const initializedRootReducer = reducer(rootReducer(history));

const savedState = localStorage.getItem('savedState');

export const store = savedState
	? createStore(initializedRootReducer, JSON.parse(savedState), enhancer)
	: createStore(initializedRootReducer, enhancer);

if (window.Cypress) {
	window.store = store;
}

/* --- react-redux-storage --- */
// const load = createLoader(engine);
// load(store);
/* --- react-redux-storage --- */

export default store;
