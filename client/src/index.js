import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import { Router, browserHistory} from 'react-router';
// import { BrowserRouter as Router } from 'react-router-dom';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux';
import routes from './routes';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import WebfontLoader from '@dr-kobros/react-webfont-loader';

import reducers from './reducers/index';
import { reducer as formReducer } from 'redux-form';
import authReducer from './reducers/auth_reducer';
import userReducer from './reducers/user_reducer';

import { AUTH_USER } from './actiontypes/auth';
import './index.css';

const config = {
	google: {
		families: ['Slabo 27px', 'Roboto:100,300,400']
	}
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(
	combineReducers({ 
		auth: authReducer, 
		form: formReducer, 
		user: userReducer, 
		routing: routerReducer 
	}), window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());



const token = cookie.load('token');
if (token) {
	store.dispatch({ type: AUTH_USER });
}

const history = syncHistoryWithStore(browserHistory, store);

render(
	<Provider store={store}>
		<WebfontLoader config={config}>
			<MuiThemeProvider>
	  		<Router history={history} routes={routes} />
	  	</MuiThemeProvider>
	  </WebfontLoader>
	</Provider>,
  document.getElementById('root')
);
