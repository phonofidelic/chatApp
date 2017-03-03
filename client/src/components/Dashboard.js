import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { protectedTest } from '../actions';
import * as actions from '../actions';

class Dashboard extends Component {

	constructor(props) {
		super(props);

		this.props.protectedTest();
	}

	renderContent() {
		if (this.props.content) {
			return (
				<p>{this.props.content}</p>
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
	return { content: state.auth.content };
}

export default connect(mapStateToProps, actions)(Dashboard);