import React, { Component } from 'react';

class Message extends Component {

	render() {
		return (
			<li>{this.props.body}<span className="timestamp">{this.props.createdAt}</span></li>
		);
	};
};

export default Message;