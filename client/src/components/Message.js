import React, { Component } from 'react';
import Client from '../Client';
import axios from 'axios';
import Style from './Message.styles.js';

const socket = Client.io();

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      id: props.id,
      replies: props.replies,
      currentReply: '',
      createdAt: props.createdAt,
      active: props.active,
      classes: ['message']
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleNewReply = this.handleNewReply.bind(this);
  };

  handleChange(e) {
    this.setState({currentReply: e.target.value});
  };

  onPostReply(e, msg) {
    e.preventDefault();
    console.log('reply:', msg);
    axios.post('http://localhost:8080/messages/'+this.props.id+'/replies', {text: msg}).then(res => {
      console.log('onPostReply response:', res.data.replies[res.data.replies.length-1]);
      socket.emit('chat response', res.data.replies[res.data.replies.length-1]);
    });
  };

  handleNewReply(msg) {
    console.log('# msg._id', msg._id, '\n# this.props.id', this.props.id)
    if (msg._id === this.props.id) {
      console.log('same')
    }
    var {replies} = this.state;
    replies.push(msg);
    this.setState({replies});
    console.log('socket reply test:', msg);
  };

  render() {
    return (
      <li onClick={this.props.onSelect} 
          className="message"
          style={this.props.active ? Style.selected : Style.notSelected}>
        <div style={Style.debug}>{this.state.createdAt}</div>
          {this.state.text}
        <span>{this.props.replies.length ? '*' : ''}</span>
        <ul>
          {this.props.active ? (
            this.props.replies.map(reply => {
              return(<li key={reply._id} className="reply">{reply.text}</li>)
            })
          ) : (
            null
          )}
        </ul>
      </li>
    )    
  };
};

export default Message;

