import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ConversationItem from './ConversationItem';
import './Conversations.css';

class Conversations extends Component {

	constructor(props) {
		super(props);

		this.props.getConversations();		
	}

	handleSelectConversation(conversationId) {
		this.props.getConversation(conversationId);
	}

	renderConversationList() {
		if (this.props.conversations) {
			return (
				<div>
					<h3>Conversations:</h3>
					<ul className="conversation-list">
						{this.props.conversations.map(data => data.map(message => (
							<ConversationItem className="conversation"
																key={message._id}
																updatedAt={message.updatedAt}
																body={message.body}
																conversationId={message.conversationId} />
						)))}
					</ul>
				</div>
			);
		} else {
			return (
				<div>You have have not started any conversations yet.</div>
			);
		}
	};

	render() {
		return (
			<div>{this.renderConversationList()}</div>
		);
	};
};

function mapStateToProps(state) {
	console.log('@mapStateToProps:', state)
	return {
		conversations: state.user.conversations
	};
};

export default connect(mapStateToProps, actions)(Conversations);

