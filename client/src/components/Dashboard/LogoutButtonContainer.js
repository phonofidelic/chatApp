import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import LogoutButton from '../auth/LogoutButton';

class LogoutButtonContainer extends Component {

	toggleLogoutButton() {
		this.props.toggleLogoutButton();
	}

	render() {
		let logoutButton;
		this.props.showLogoutButton ? 
		logoutButton = <div className="logout-button-comtainer">
										 <LogoutButton />
									 </div> :
		logoutButton = null
		return(
			<div>
				<div className="primary-button"
						 onClick={() => this.toggleLogoutButton()}>Logout</div>

				<ReactCssTransitionGroup 
					transitionName="show-conversation-list"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={true}
					transitionEnterTimeout={500}
					transitionLeave={true}
					transitionLeaveTimeout={500}>{logoutButton}
				</ReactCssTransitionGroup>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		showLogoutButton: state.user.showLogoutButton
	}
}

export default connect(mapStateToProps, actions)(LogoutButtonContainer);




