import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import MessageList from './MessageList';
import Message from './Message';

class Conversation extends Component {

	constructor(props) {
		super(props);

		// get messages from conversation
		const { params, getConversation } = this.props;
	  getConversation(params.conversationId);

	  // TODO: add socket handler for refreshing new messages

		console.log('# props:', this.props)
	};

	renderConversation() {
		console.log('## this.props:', this.props)

		// pass mnessages array to MessageList component
		if (this.props.messages) {
			return (
				<div>
					<h3>Conversation</h3>
					 <MessageList displayMessages={this.props.messages} />
				</div>
			);
		} else {
			return (
				<div><h3>No messages to display</h3></div>
			);
		}
	};

	render() {
		return (
			<div>
				<a href={'/dashboard'}><button>back</button></a>
				<div>{this.renderConversation()}</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	console.log('# satate:', state)
	return {
		messages: state.user.conversation
	};
};

export default connect(mapStateToProps, actions)(Conversation);