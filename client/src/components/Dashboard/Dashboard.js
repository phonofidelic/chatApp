import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import Conversations from './Conversations';
import './Dashboard.css';

class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.props.viewProfile();
	};

	renderUserInfo() {
		if (this.props.user) {
			return (
				<p>hello, {this.props.user.username}</p>
			);
		}
	};

	render() {
		return (
			<div className="dasboard-container">
				<div className="greeting">{this.renderUserInfo()}</div>
				<div>TODO: add "view/edit account info"</div>
				<Conversations />
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