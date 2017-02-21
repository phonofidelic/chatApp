import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import NotFound from './components/pages/NotFound';
import HomePage from './components/pages/HomePage';
import Register from './components/pages/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard';
import RequireAuth from './components/auth/RequireAuth';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={HomePage} />
		<Route path="register" component={Register} />
		<Route path="login" component={Login} />
		<Route path="dashboard" component={RequireAuth(Dashboard)} />

		<Route path="*" component={NotFound} />
	</Route>
);