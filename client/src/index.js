import React from 'react';
import ReactDOM from 'react-dom';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import App from './containers/App';
import './index.css';

const config = {
	google: {
		families: ['Slabo 27px', 'Roboto']
	}
}

ReactDOM.render(
	<WebfontLoader config={config}>	
  	<App />
  </WebfontLoader>,
  document.getElementById('root')
);
