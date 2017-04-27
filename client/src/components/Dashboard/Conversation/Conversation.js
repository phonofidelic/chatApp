import React, { Component } from 'react';
import { Link } from 'react-router';
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
		// pass messages array to MessageList component
		if (this.props.messages) {
			return (
				<div>
					 <MessageList displayMessages={this.props.messages.reverse()} />
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
				<div className="back-button-container">
					<Link to={'/dashboard'}>
						<button className="secondary-button">back</button>
					</Link>
				</div>
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