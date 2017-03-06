import React, { Component } from 'react';
import './App.css';
import Header from '../components/Header/Header';
import Navigation from '../components/Navigation';
import Chat from '../components/Chat';

const MESSAGES_ROUTE = 'http://localhost:3001/api/chat';

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
