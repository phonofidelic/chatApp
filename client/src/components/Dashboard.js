import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.props.protectedTest();

		this.props.viewProfile();
	}

	renderContent() {
		if (this.props.user) {
			return (
				<p>hello, {this.props.user.username}</p>
			);
		}
	}

	render() {
		return (
			<div>
				<h1>Dashboard</h1>
				{this.renderContent()}
			</div>
		)
	};
};

function mapStateToProps(state) {
	console.log('@mapStateToProps:', state)
	return { 
		content: state.auth.content,
		user: state.user.userInfo
	};
}

export default connect(mapStateToProps, actions)(Dashboard);