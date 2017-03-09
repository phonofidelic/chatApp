import React, { Component } from 'react';

class ConversationItem extends Component {

	constructor(props) {
		super(props);
		console.log('## props', props)
	};

	handleSelectConversation() {
		this.props.getConversation(this.props.conversationId);
		// console.log('this.props', this.props)
	}

	render() {
		return (
			<a href={`dashboard/conversation/view/${this.props.conversationId}`}>
				<li className="conversation" 
						key={this.props._id}>
					<div className="timestamp">{this.props.timestamp}</div>
					<div>{this.props.author} said: {this.props.body}</div>
				</li>
			</a>
		);
	}
};

export default ConversationItem;