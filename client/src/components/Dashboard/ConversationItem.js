import React, { Component } from 'react';

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
			<a href={`dashboard/conversation/view/${this.props.conversationId}`}>
				<li className="conversation" 
						key={this.props._id}>
					<div className="timestamp">{this.props.timestamp}</div>
					<div className="conversation-body">{this.props.author} said: {this.props.body}</div>
				</li>
			</a>
			</div>
		);
	}
};

export default ConversationItem;


// <div>{this.props.author} said: {this.props.body.length > 20 ? this.props.body.slice(0, 20)+'...' : this.props.body}</div>