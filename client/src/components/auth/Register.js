import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import registerUser from '../../actions';

const form = reduxForm({
	form: 'register',
	validate
});

const renderField = field => (
	<div>
		<input {...field.input} />
		{field.touched && field.error && <div className="error">{field.error}</div>}
	</div>
);

function validate(formProps) {
	const errors = {};

	if (!formProps.username) {
		errors.uservame = 'Please enter a username'
	}

	if (!formProps.email) {
		errors.email = 'Please enter an email address';
	}

	if (!formProps.password) {
		errors.password = 'Please enter a password';
	}

	return errors;
};

class Register extends Component {
	handleFormSubmit(formProps) {
		this.props.registerUser(formProps);
	};

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
			<h1>Register</h1>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				{this.renderAlert()}
					<div className="input-username">
						<label>Username</label>
						<Field name="username" component={renderField} type="text" />
					</div>
					<div className="input-email">
						<label>Email</label>
						<Field name="email" component={renderField} type="email" />
					</div>
					<div className="input-password">
						<label>Password</label>
						<Field name="password" component={renderField} type="password" />
					</div>
					<button type="submit">Register</button>
				</form>
			</div>
		);
	};
};

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.error,
		message: state.auth.message
	};
};

export default connect(mapStateToProps, { registerUser })(form(Register));


