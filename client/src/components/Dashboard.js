import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

	constructor(props) {
		super(props);

		// this.props.protectedTest();

		this.props.viewProfile();
		this.props.getConversations();
	}

	renderContent() {
		if (this.props.user) {
			return (
				<p>hello, {this.props.user.username}</p>
			);
		}
	}

	renderConversationList() {
		if (this.props.conversations) {
			return (
				<div>
					<h3>Conversations</h3>
					<ul>
						{this.props.conversations.map((conversation) => {
							return (
								<li>{conversation[0].body}</li>
							)
						})}
					</ul>
				</div>
			)
		}
	}

	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				{this.renderContent()}
				{this.renderConversationList()}
			</div>
		)
	};
};

function mapStateToProps(state) {
	console.log('@mapStateToProps:', state)
	return { 
		content: state.auth.content,
		user: state.user.userInfo,
		conversations: state.user.conversations
	};
}

export default connect(mapStateToProps, actions)(Dashboard);