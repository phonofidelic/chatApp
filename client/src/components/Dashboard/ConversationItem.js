import React, { Component } from 'react';
import { Link } from 'react-router';

class ConversationItem extends Component {

	constructor(props) {
		super(props);
	};

	handleSelectConversation() {
		this.props.getConversation(this.props.conversationId);
		// console.log('this.props', this.props)
	}

	render() {
		return (
			<div className="conversation-item-container">
			<Link to={`dashboard/conversation/view/${this.props.conversationId}`}>
				<li className="conversation" 
						key={this.props._id}>
					<div className="timestamp">{this.props.timestamp}</div>
					<div className="conversation-body">{this.props.author} said: {this.props.body}</div>
				</li>
			</Link>
			</div>
		);
	}
};

export default ConversationItem;


