import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';

import { Router, hashHistory } from 'react-router';
// import { BrowserRouter as Router } from 'react-router-dom';
import { routerMiddleware, syncHistoryWithStore, routerReducer } from 'react-router-redux';
import routes from './routes';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import WebfontLoader from '@dr-kobros/react-webfont-loader';

// import rootReducer from './reducers/index';
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

const muiTheme = getMuiTheme({
	// TODO: add custom default style props for mui
})

const middleware = routerMiddleware(hashHistory);

const createStoreWithMiddleware = applyMiddleware(reduxThunk, middleware)(createStore);
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
} else {
	console.log('# not authenticated #');
}

const history = syncHistoryWithStore(hashHistory, store);

render(
	<Provider store={store}>
		<WebfontLoader config={config}>
			<MuiThemeProvider muiTheme={muiTheme}>
	  		<Router history={history} routes={routes} />
	  	</MuiThemeProvider>
	  </WebfontLoader>
	</Provider>,
  document.getElementById('root')
);
