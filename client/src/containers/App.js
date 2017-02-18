import React, { Component } from 'react';
import './App.css';
import Client from '../Client';
import Message from '../components/Message';
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
      currentRoute: MESSAGES_ROUTE
    };

    this.handleChange = this.handleChange.bind(this);

    this.onRecieveMsg = this.onRecieveMsg.bind(this);

    this.onRecieveResponse = this.onRecieveResponse.bind(this);

    this.handleSelect = this.handleSelect.bind(this);

    // this.onPostMsg = this.onPostMsg.bind(this);
  };

  componentDidMount() {
    // this.getMessages();
    axios.get(MESSAGES_ROUTE).then(res => {           
      console.log('Initial messages:', res)

      const messages = res.data.sort(this.sortMessages);
      this.setState({messages})
    });
    socket.on('new message', this.onRecieveMsg);
    socket.on('new response', this.onRecieveResponse);
  };

  sortMessages(a, b) {
    return a.createdAt - b.createdAt;
  }

  getMessages() {
    axios.get(MESSAGES_ROUTE).then(res => {           
      console.log('Initial messages:', res)

      const messages = res.data;
      this.setState({messages})
    });
  };

  handleChange(e) {
    this.setState({currentMessage: e.target.value});
  };

  // TODO: add validation
  onPostMsg(e, msg) {
    e.preventDefault();
    console.log('Post message:', msg);
    axios.post(this.state.currentRoute, {text: msg}).then(res => {
      console.log('onPostMsg response:', res);
      socket.emit('chat message', res.data);
    });
    this.setState({currentMessage: ''});
  };

  onPostReply(e, msg) {
    e.preventDefault();
    console.log('Post message:', msg);
    axios.post(this.state.currentRoute, {text: msg}).then(res => {
      console.log('onPostMsg response:', res);
      socket.emit('chat response', res.data);
    });
    this.setState({currentMessage: ''});
  };

  onRecieveMsg(msg) {
    var {messages} = this.state;
    messages.unshift(msg);
    this.setState({messages});
    console.log('# socket test', msg)
  };

  onRecieveResponse(msg) {
    this.getMessages();
    var {messages} = this.state;
    messages = messages.sort(this.sortMessages);
    this.setState({messages});
  };

  handleSelect(index, id) {
    // console.log('msg id:', this.state.messages[index].id)
    console.log('msg id:', id);
    this.setState({currentRoute: MESSAGES_ROUTE+'/'+id+'/replies'})
    this.state.activeIndex === index ? 
      this.setState({
        activeIndex: null, 
        currentRoute: MESSAGES_ROUTE
      }) : 
      this.setState({activeIndex: index});
    // this.setState({activeIndex: index})
  };

  handleDeSelect() {
    this.setState({activeIndex: null})
  }

  // move reply logic here.
  // if activeIndex -> set the post route to append indexed messges id+'/replies'
  // and change form ui to indicate that the user is replying to a selected message

  render() {
    var active = this.state.activeIndex;

    let messageForm = <form>
                        <input type="text" value={this.state.currentMessage} onChange={this.handleChange}/>
                        <button onClick={(e) => this.onPostMsg(e, this.state.currentMessage)}>post</button>
                      </form>;

    let replyForm = <form>
                        <input type="text" value={this.state.currentMessage} onChange={this.handleChange}/>
                        <button onClick={(e) => this.onPostReply(e, this.state.currentMessage)}>reply</button>
                      </form>;

    return (
      <div>
      <header>
        <h1>phono_chat</h1>
      </header>
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
}

export default App;
