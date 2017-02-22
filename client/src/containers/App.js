import React, { Component } from 'react';
import './App.css';
import Client from '../Client';
import Header from '../components/Header/Header';
import Message from '../components/Message/Message';
import axios from 'axios';

const socket = Client.io();

// TODO: bind MESSAGES_ROUTE conditionaly to correct env var
// Productoin api base url
// const MESSAGES_ROUTE = 'https://phono-chat.herokuapp.com/messages';
// Development api base url
const MESSAGES_ROUTE = 'http://localhost:3001/messages';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
      currentMessage: '',
      currentRoute: MESSAGES_ROUTE,
      inputError: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.onRecieveMsg = this.onRecieveMsg.bind(this);
    this.onRecieveResponse = this.onRecieveResponse.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  };

  componentDidMount() {
    this.getMessages();
    socket.on('new message', this.onRecieveMsg);
    socket.on('new response', this.onRecieveResponse);
  };

  sortMessages(a, b) {
    return a.createdAt - b.createdAt;
  };

  getMessages() {
    axios.get(MESSAGES_ROUTE).then(res => {           
      console.log('Initial messages:', res)

      const messages = res.data.sort(this.sortMessages);;
      this.setState({messages})
    });
  };

  handleChange(e) {
    this.setState({currentMessage: e.target.value});
  };

  onPostMsg(e, msg) {
    e.preventDefault();

    if (this.state.currentMessage !== '') {
      console.log('Post message:', msg);
      axios.post(this.state.currentRoute, {text: msg}).then(res => {
        console.log('onPostMsg response:', res);
        socket.emit('chat message', res.data);
      });
      this.setState({currentMessage: ''});
    } else {
      console.error('empty message');
      window.alert('empty message');
    }
  };

  onPostReply(e, msg) {
    e.preventDefault();
    
    if (this.state.currentMessage !== '') {
      console.log('Post message:', msg);
      axios.post(this.state.currentRoute, {text: msg}).then(res => {
        console.log('onPostMsg response:', res);
        socket.emit('chat response', res.data);
      });
      this.setState({currentMessage: ''});
    } else {
      console.error('empty message');
      window.alert('empty message');      
    }
  };

  onRecieveMsg(msg) {
    var {messages} = this.state;
    messages.unshift(msg);
    this.setState({messages});
  };

  onRecieveResponse(msg) {
    this.getMessages();
    var {messages} = this.state;
    messages = messages.sort(this.sortMessages);
    this.setState({messages});
  };

  handleSelect(index, id) {
    this.setState({currentRoute: MESSAGES_ROUTE+'/'+id+'/replies'})
    this.state.activeIndex === index ? 
      this.setState({
        activeIndex: null, 
        currentRoute: MESSAGES_ROUTE
      }) : 
      this.setState({activeIndex: index});
  };

  render() {
    var active = this.state.activeIndex;

    let messageForm = <form className="messageForm">
                        <input type="text" value={this.state.currentMessage} onChange={this.handleChange}/>
                        <button onClick={(e) => this.onPostMsg(e, this.state.currentMessage)}>post</button>
                      </form>;

    let replyForm = <form className="messageForm">
                        <input type="text" value={this.state.currentMessage} onChange={this.handleChange}/>
                        <button onClick={(e) => this.onPostReply(e, this.state.currentMessage)}>reply</button>
                      </form>;

    return (
      <div>
        <Header />
      <div className="container">
        {this.props.children}
      </div>
        <ul id="messages">
        
          {this.state.messages.map((msg, index) => {
            return (
              <Message                 
                text={msg.text}
                replies={msg.replies}
                key={msg._id} 
                id={msg._id}
                createdAt={msg.createdAt}
                active={index === active}
                onSelect={this.handleSelect.bind(null, index, msg._id)}
                />
            );
          })}
        </ul>
        {active || active === 0 ? replyForm : messageForm}
      </div>
    );
  };
};

export default App;
