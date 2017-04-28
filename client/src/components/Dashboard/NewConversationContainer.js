import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import NewConversation from './NewConversation';

class NewConversationContainer extends Component {

	constructor(props) {
		super(props);
	}

	toggleNewConversation() {
		this.props.toggleNewConversation();
	}

	render(){
		let newConversation;
		this.props.showNewConversation ? 
			newConversation = <div className="newConversationContainer">
											 		<NewConversation />
											  </div> :
			newConversation = null;

		return(
			<div className="new-conversation-container">
				<div className="primary-button"
						 onClick={() => this.toggleNewConversation()}>New Conversation</div>

				<ReactCssTransitionGroup 
					transitionName="show-conversation-list"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={true}
					transitionEnterTimeout={500}
					transitionLeave={true}
					transitionLeaveTimeout={500}>{newConversation}
				</ReactCssTransitionGroup>						
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		showNewConversation: state.user.showNewConversation
	}
}

export default connect(mapStateToProps, actions)(NewConversationContainer);

