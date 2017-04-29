import React, { Component } from 'react';
import './App.css';
import Header from '../components/Header/Header';

class App extends Component {
  render() {
    return (
      <div>
        <div className="nav-container">
          <Header />
        </div>
	      <div className="content-container">
	        {this.props.children}
	      </div>
        
      </div>
    );
  };
};

export default App;
