import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dashboard from './Dashboard/Dashboard';
import Login from './auth/Login';

class HomePage extends Component {
	render() {
		return (
			<div>{this.props.authenticated ? <Dashboard /> : <Login />}</div>
		)
	};
};

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps)(HomePage);