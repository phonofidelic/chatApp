import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ConversationList from './ConversationList';
import LogoutButton from '../auth/LogoutButton';
import ProfileManager from './ProfileManager';
import './Dashboard.css';

class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.props.viewProfile();
	};

	render() {
		return (
			<div className="dashboard-container">
				<div className="greeting">
					<p>hello, {this.props.user ? this.props.user.username : ''}</p>
				</div>
				<div>TODO: add "view/edit account info"</div>
				<ProfileManager />
				<ConversationList />
				<div className="stuck-bottom">
					<a href="dashboard/conversation/new">
						<div className="new-conversation-button">New conversation</div>
					</a>
					<button onClick={this.props.logoutUser.bind(this)}>Logout</button>
				</div>
				
			</div>
		)
	};
};

function mapStateToProps(state) {
	
	return { 
		user: state.user.userInfo
	};
};

export default connect(mapStateToProps, actions)(Dashboard);