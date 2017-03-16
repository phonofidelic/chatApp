import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory} from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import routes from './routes';
import reducers from './reducers/index';
import { AUTH_USER } from './actiontypes/auth';
import './index.css';

const config = {
	google: {
		families: ['Slabo 27px', 'Roboto:100,300,400']
	}
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers, window.window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

const token = cookie.load('token');
if (token) {
	store.dispatch({ type: AUTH_USER });
}

render(
	<Provider store={store}>
		<WebfontLoader config={config}>
			<MuiThemeProvider>
	  		<Router history={browserHistory} routes={routes} />
	  	</MuiThemeProvider>
	  </WebfontLoader>
	</Provider>,
  document.getElementById('root')
);
