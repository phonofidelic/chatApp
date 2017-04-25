import React, { Component } from 'react';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import ConversationList from './ConversationList';

class ConversationListContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showConversationList: true
		};
	}

	render() {
		let conversationList;
		this.state.showCionversationList ? 
			conversationList = <div className="conversation-list-container">
														<ConversationList />
													</div> :
			conversationList = null;

		return(
			<div>
				<div className="primary-button"
						 onClick={() => this.setState(() => this.state.showConversationList ? {showConversationList: false} : {showConversationList: true})}>Conversations</div>

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

export default ConversationListContainer;

