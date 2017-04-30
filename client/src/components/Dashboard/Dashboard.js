import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ConversationListContainer from './ConversationListContainer';
import ProfileManagerContainer from './ProfileManagerContainer';
import NewConversationContainer from './NewConversationContainer';
import LogoutButtonContainer from './LogoutButtonContainer';
import './Dashboard.css';

class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.props.viewProfile();

		// timeout for session  BUG: resets after each page/component refresh
		setTimeout(() => {
			this.props.logoutUser()
		}, 3600 * 1000);
	};

	render() {
		const stuckBottom = {
			position: 'fixed',
			bottom: 0,
			left: 0,
			right: 0,
			background: '#fff'
		};

		return (
			<div className="dashboard-container">
				<div className="greeting">
					<p>hello, {this.props.user ? this.props.user.username : ''}</p>
				</div>
				<ProfileManagerContainer />
				<ConversationListContainer />
				<div style={this.props.showConversationList ? stuckBottom : null}>
					<NewConversationContainer />
				
				<LogoutButtonContainer />
				</div>
				
			</div>
		)
	};
};

function mapStateToProps(state) {
	
	return { 
		user: state.user.userInfo,
		showConversationList: state.user.showConversationList
	};
};

export default connect(mapStateToProps, actions)(Dashboard);

