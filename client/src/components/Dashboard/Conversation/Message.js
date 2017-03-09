import React, { Component } from 'react';
import './Message.css';

class Message extends Component {

	render() {
		return (
			<li className="message">
				<div className="timestamp">{this.props.createdAt}</div>
				<div className="user-tag">{`${this.props.author}: `}</div>
				<div className="message-body">{this.props.body}</div>
			</li>
		);
	};
};

export default Message;