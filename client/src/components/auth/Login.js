import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { loginUser } from '../../actions';

const form = reduxForm({
	form: 'login'
});

class Login extends Component {
	handleFormSubmit(formProps) {
		this.props.loginUser(formProps);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div>
					<span><strong>Error!</strong> {this.props.errorMessage}</span>
				</div>
			);
		}
	};

	render() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<div className="input-email">
						<label>Email</label>
						<Field name="email" component="input" type="text" />
					</div>
					<div className="input-password">
						<label>Password</label>
						<Field name="password" component="input" type="password" />
					</div>
					<button type="submit">Login</button>
				</form>
			</div>
		);
	};
};

function mapStateToProps(state) {
	return {
		errorMessages: state.auth.error,
		message: state.auth.error
	}
};

export default connect(mapStateToProps, { loginUser })(form(Login));

