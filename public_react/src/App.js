import React, { Component } from 'react';
import './App.css';
import Client from './Client';
import Message from './Message';
import axios from 'axios';

const socket = Client.io();

const MESSAGES = 'http://localhost:8080/messages';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);

    this.onRecieveMsg = this.onRecieveMsg.bind(this)
  };

  componentDidMount() {
    this.getMessages();
    socket.on('new message', this.onRecieveMsg);
  };

  getMessages() {
    axios.get(MESSAGES).then(res => {           
      console.log('Initial messages:', res)

      const messages = res.data;
      this.setState({messages})
    })
  };

  handleChange(e) {
    this.setState({currentMessage: e.target.value});
  };

  onPostMsg(e, msg) {
    e.preventDefault();
    console.log('Post message:', msg)
    axios.post(MESSAGES, {text: msg}).then(res => {
      console.log('onPostMsg response:', res);
      socket.emit('chat message', res.data);
    });
  };

  onRecieveMsg(msg) {
    var {messages} = this.state;
    messages.push(msg);
    this.setState({messages});
    console.log('# socket test', msg)

    // this.setState({msg});
    // messages.push(msg)
    // this.setState({messages});
  };

  render() {
    return (
      <div>
      <header>
        <h1>phono_chat</h1>
      </header>
        <ul id="messages">
          {this.state.messages.map(msg => {
            return (
              <Message 
                text={msg.text}
                key={msg._id} 
                isActive={false}/>
            );
          })}
        </ul>
        <form>
          <input type="text" value={this.state.currentMessage} onChange={this.handleChange}/>
          <button onClick={(e) => this.onPostMsg(e, this.state.currentMessage)}>post</button>
        </form>
      </div>
    );
  };
}

export default App;
