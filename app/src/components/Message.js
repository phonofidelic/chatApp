import React, { Component } from 'react';
import Client from '../Client';
import axios from 'axios';

const socket = Client.io();

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      id: props.id,
      replies: props.replies,
      currentReply: '',
      isActive: false,
      classes: ['message']
    };

    this.handleChange = this.handleChange.bind(this);

    // this.onSelectMsg = this.onSelectMsg.bind(this);

    this.handleNewReply = this.handleNewReply.bind(this);
  };

  componentDidMount() {
    // if (this.state.replies.length) {
    //   axios.get('http://localhost:8080/messages/'+this.props.id+'/replies').then(res => {
    //     const replies = res.data;
    //     this.setState({replies});
    //   }).catch(err => {
    //     console.error('error:', err)
    //   });
    // } else {
    //   console.log('no replies for message', this.props.id);
    // }

    // socket.on('new response', this.handleNewReply);
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
    const 
    selected = {
            background: '#ff4d62',
            color: '#fff'
          },
          notSelected = {
            background: '#f6f6f6',
            color: '#555'
          },
          replies = {
            left: '0',
            possition: 'fixed'
          },
          debug = {
            textAlign: 'right',
            width: '100%',
            color: '#ced0d0',
            fontSize: '10px'
          },
          form = {
            zIndex: '1000',
            width: '100%',
            left: '0'
          }
    let isActive = this.state.isActive;

    let message = null;

    if (this.state.isActive) {
      message = <li onClick={this.props.onSelect} style={this.props.active ? selected : ''}>
                  <div  style={selected}>{this.state.text}
                    <ul style={selected}>replies:
                      {this.props.replies.map(reply => {
                        return(<li style={selected} key={reply._id}>{reply.text}</li>)
                      })}
                    </ul>
                  </div>
                 
                    <form style={form}>
                      <input type="text" value={this.state.currentReply} onChange={this.handleChange} />
                      <button onClick={e => this.onPostReply(e, this.state.currentReply)} style={selected}>reply</button>
                    </form>
                  
                </li>
    } else {
        message = <li onClick={this.props.onSelect} style={this.props.active ? selected : notSelected}>
          <div style={debug}>{this.state.id}</div>
          {this.state.text}
          <span>{this.props.replies.length ? '*' : ''}</span>
        </li>
    }

    return (message);
  };
}

export default Message;

