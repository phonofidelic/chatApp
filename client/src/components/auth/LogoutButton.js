import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class LogoutButton extends Component {
	
	constructor(props) {
		super(props);
	};

	render() {
		return (
			<button onClick={this.props.logoutUser.bind(this)}>Logout</button>
		);
	}
}



export default connect(actions.logoutUser)(LogoutButton);