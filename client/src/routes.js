import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import NotFound from './components/pages/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Conversations from './components/Dashboard/Conversations';
import Conversation from './components/Dashboard/Conversation/Conversation';
import RequireAuth from './components/auth/RequireAuth';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={RequireAuth(Dashboard)} />

		<Route path="dashboard">
			<IndexRoute component={RequireAuth(Dashboard)} />
			<Route path="conversation/view/:conversationId" component={RequireAuth(Conversation)} />
		</Route>

		<Route path="register" component={Register} />
		<Route path="login" component={Login} />
		<Route path="conversations" component={RequireAuth(Conversations)} />
		

		<Route path="*" component={NotFound} />
	</Route>
);