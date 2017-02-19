import React from 'react';
import ReactDOM from 'react-dom';
import WebfontLoader from '@dr-kobros/react-webfont-loader';
import App from './containers/App';
import './index.css';

const config = {
	google: {
		families: ['Slabo 27px', 'Roboto:100,300,400']
	}
}

ReactDOM.render(
	<WebfontLoader config={config}>	
  	<App />
  </WebfontLoader>,
  document.getElementById('root')
);
