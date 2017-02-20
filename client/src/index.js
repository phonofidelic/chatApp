import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory} from 'react-router';	// --- Learn more!
import reduxThunk from 'redux-thunk';	// ---------------- Learn more!

import UserReducer from './reducers/user';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import App from './containers/App';
import routes from './routes'; // TODO
import reducers from './reducers/index';
import './index.css';

const config = {
	google: {
		families: ['Slabo 27px', 'Roboto:100,300,400']
	}
}

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

render(
	<Provider store={store}>
		<WebfontLoader config={config}>	
	  	<Router history={browserHistory} routes={routes} />
	  </WebfontLoader>
	</Provider>,
  document.getElementById('root')
);
