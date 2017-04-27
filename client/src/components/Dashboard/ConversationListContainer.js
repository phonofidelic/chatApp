import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import ConversationList from './ConversationList';

class ConversationListContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showConversationList: false
		};
	}

	toggleConversationList() {
		this.props.toggleConversationList();
	}

	render() {
		let conversationList;
		this.props.showConversationList ? 
			conversationList = <div className="conversation-list-container">
														<ConversationList />
												 </div> :
			conversationList = null;

		return(
			<div>
				<div className="primary-button"
						 onClick={() => this.toggleConversationList()}>Conversations</div>

				<ReactCssTransitionGroup 
					transitionName="show-conversation-list"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={true}
					transitionEnterTimeout={500}
					transitionLeave={true}
					transitionLeaveTimeout={500}>{conversationList}
				</ReactCssTransitionGroup>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		showConversationList: state.user.showConversationList
	}
}

export default connect(mapStateToProps, actions)(ConversationListContainer);

