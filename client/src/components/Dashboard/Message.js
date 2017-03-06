import React, { Component } from 'react';

class Message extends Component {

	constructor(props) {
		super(props);
	};

	render() {
		return (
			<li>{this.props.body}</li>
		);
	};
};

export default Message;