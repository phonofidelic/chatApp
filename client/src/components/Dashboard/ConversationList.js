import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ConversationItem from './ConversationItem';
import './ConversationList.css';

class ConversationList extends Component {

	constructor(props) {
		super(props);

		this.props.getConversations();
	}

	handleSelectConversation(conversationId) {
		this.props.getConversation(conversationId);
	}

	render() {
		if (this.props.conversations) {
			this.props.conversations.reverse();
			return (
				<div>
					<ul className="conversation-list">
						{this.props.conversations.map(data => data.map(message => (
							<ConversationItem className="conversation"
																key={message._id}
																timestamp={message.updatedAt}
																body={message.body}
																conversationId={message.conversationId}
																authorId={message.author._id}
																author={message.author.profile.username} />
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
};

function mapStateToProps(state) {
	return {
		conversations: state.user.conversations
	};
};

export default connect(mapStateToProps, actions)(ConversationList);

