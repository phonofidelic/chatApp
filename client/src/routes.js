import React from 'react';
import { Route, IndexRoute } from 'react-router';
// import { Route } from 'react-router-dom';

import App from './containers/App';
import NotFound from './components/pages/NotFound';
import RegisterWithReference from './components/auth/RegisterWithReference';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Conversation from './components/Dashboard/Conversation';
import RequireAuth from './components/auth/RequireAuth';
import HomePage from './components/HomePage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={RequireAuth(HomePage)} />

		<Route path="dashboard">
			<IndexRoute component={RequireAuth(Dashboard)} />
			<Route path="conversation/view/:conversationId" component={RequireAuth(Conversation)} />
		</Route>

		<Route path="register/:inviteId" component={RegisterWithReference} />
		<Route path="login" component={Login} />		

		<Route path="*" component={NotFound} />
	</Route>
);