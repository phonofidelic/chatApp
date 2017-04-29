import React, { Component } from 'react';
import * as actions from '../../actions';
import { connect } from 'react-redux';

export default function(ComposedComponent) {
	class Authentication extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		};

		componentWillMount() {
			if (!this.props.authenticated) {
				this.props.logoutUser();				
				this.context.router.push('/login');
			}
		};

		componentDidMount() {
			console.log('### test');
			if (!this.props.authenticated) {
				console.log('### test');
				this.props.logoutUser();				
				this.context.router.push('/login');
			}
		}

		componentWillUpdate(nextProps) {
			if (!nextProps.authenticated) {
				this.props.logoutUser();				
				this.context.router.push('/login');
			}
		};

		render() {
			return <ComposedComponent {...this.props} />
		};
	};

	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated };
	};

	return connect(mapStateToProps, actions)(Authentication);
};