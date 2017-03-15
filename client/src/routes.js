import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import NotFound from './components/pages/NotFound';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
import ConversationList from './components/Dashboard/ConversationList';
import Conversation from './components/Dashboard/Conversation/Conversation';
import NewConversation from './components/Dashboard/Conversation/NewConversation';
import RequireAuth from './components/auth/RequireAuth';
import HomePage from './components/HomePage';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={RequireAuth(HomePage)} />

		<Route path="dashboard">
			<IndexRoute component={RequireAuth(Dashboard)} />
			<Route path="conversation/view/:conversationId" component={RequireAuth(Conversation)} />
			<Route path="conversation/new" component={RequireAuth(NewConversation)} />
		</Route>

		<Route path="register" component={Register} />
		<Route path="login" component={Login} />
		<Route path="conversations" component={RequireAuth(ConversationList)} />
		

		<Route path="*" component={NotFound} />
	</Route>
);