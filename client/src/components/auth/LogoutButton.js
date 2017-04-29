import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LogoutButton extends Component {

	render() {
		return (
			<div className="logout-alert">
				<h3 style={{'textAlign': 'center'}}>Are you sure you want to log out?</h3>
				<button className="secondary-button-inline"
								onClick={() => this.props.toggleLogoutButton()}>no</button>
				<button className="secondary-button-inline" 
								onClick={this.props.logoutUser.bind(this)}>yes</button>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps, actions)(LogoutButton);