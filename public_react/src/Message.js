import React, { Component } from 'react';
import './Message.css';

class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text,
      isActive: false,
      classes: ['message']
    };

    this.onSelectMsg = this.onSelectMsg.bind(this);
  }

  onSelectMsg() {
    console.log('*select*');
    var {isActive} = this.state;
    isActive = !isActive;

    this.setState({isActive});
  }

  render() {
    const selected = {
      background: '#ff4d62'
    }
    return (
      <li onClick={this.onSelectMsg} style={this.state.isActive ? selected : null}>{this.state.text}</li>
    )
  }
}

export default Message;