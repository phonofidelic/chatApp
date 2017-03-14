import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import ConversationList from './ConversationList';
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
				<ConversationList />
				<button onClick={this.props.logoutUser.bind(this)}>Logout</button>
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