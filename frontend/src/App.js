import React, { Suspense, lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import { history, store } from './store';
import '@nokia-csf-uxr/csfWidgets/csfWidgets.css';
import './App.css';
import PrivateRoute from './components/PrivateRoute';
import { CBIS_MANAGER_API_DOC } from 'constants/app-constants';
const Login = lazy(() => import('./components/Login'));
const Dashboard = lazy(() => import('./components/Dashboard'));
const Report = lazy(() => import('./components/Report'));
const Wizard = lazy(() => import('components/wizard/Wizard'));

// TODO: load 'map.prototype.tojson' only on dev/debug mode - it will show Maps object in Redux dev tool
//import 'map.prototype.tojson';

const App = () => (
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<Suspense fallback={<div>Loading...</div>}>
				<Switch>
					<Route path='/login' component={Login} />
					<PrivateRoute exact path='/dashboard' component={Dashboard} />
					<PrivateRoute exact path='/wizard' component={Wizard} />
					<PrivateRoute exact path='/report' component={Report} />
					<Route exact path={CBIS_MANAGER_API_DOC}>
						<Link to={{ pathname: { CBIS_MANAGER_API_DOC } }} />
					</Route>
					<Route path='*' component={Login} />
				</Switch>
			</Suspense>
		</ConnectedRouter>
	</Provider>
);

export default App;
