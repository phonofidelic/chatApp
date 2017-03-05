import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

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
					<div className="timestamp">{this.props.updatedAt}</div>
					<div>{this.props.body}</div>
				</li>
			</a>
		);
	}
};

export default ConversationItem;