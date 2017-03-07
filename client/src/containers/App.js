import React, { Component } from 'react';
import './App.css';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Navigation />
	      <div className="nav-container">
	        {this.props.children}
	      </div>
        
      </div>
    );
  };
};

export default App;
