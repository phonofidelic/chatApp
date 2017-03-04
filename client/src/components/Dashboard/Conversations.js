import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import './Conversations.css';

class Conversations extends Component {

	constructor(props) {
		super(props);

		this.props.getConversations();		
	}

	renderConversationList() {
		if (this.props.conversations) {
			return (
				<div>
					<h3>Conversations:</h3>
					<ul className="conversation-list">
						{this.props.conversations.map((conversation) => {
							return (
								<li className="conversation" key={conversation[0].conversationId}>
									<div className="timestamp">{conversation[0].updatedAt}</div>
									<div>{conversation[0].body}</div>
								</li>
							)
						})}
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

