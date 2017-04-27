import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as actions from '../../actions';
import ConversationListContainer from './ConversationListContainer';
import ConversationList from './ConversationList';
import LogoutButton from '../auth/LogoutButton';
import AddNewContactForm from './AddNewContactForm';
import ProfileManagerContainer from './ProfileManagerContainer';
import NewConversationContainer from './NewConversationContainer';
import './Dashboard.css';

class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.props.viewProfile();
	};

	render() {
		const stuckBottom = {
			position: 'fixed',
			bottom: 40,
			left: 0,
			right: 0
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
				</div>
				<div className="stuck-bottom">

					<button className="secondary-button"
									onClick={this.props.logoutUser.bind(this)}>Logout</button>
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

