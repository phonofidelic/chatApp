import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import MessageList from './MessageList';
import MessagingForm from './MessagingForm';

const socket = actions.socket;

class Conversation extends Component {

	constructor(props) {
		super(props);

		// get messages from conversation
		const { params, getConversation } = this.props;
	  getConversation(params.conversationId);

	  socket.emit('enter conversation', params.conversationId);

	  // TODO: add socket handler for refreshing new messages
	  socket.on('refresh messages', (data) => {
	  	console.log('socket event:', data)
	  	getConversation(params.conversationId);
	  });
	};

	componenetWillUnmount() {
		socket.emit('leave conversation', this.props.params.conversationId);
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
				<div><MessagingForm replyTo={this.props.params.conversationId}/></div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		messages: state.user.conversation
	};
};

export default connect(mapStateToProps, actions)(Conversation);