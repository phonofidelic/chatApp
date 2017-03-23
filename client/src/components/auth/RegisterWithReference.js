import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';
import { registerWithReference } from '../../actions';

const form = reduxForm({
	form: 'register',
	validate
});

const renderField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
	<TextField 
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		{...custom} />
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
		console.log('@handleFormSubmit:', this.props.params.inviteId, formProps);
		this.props.registerWithReference(this.props.params.inviteId, formProps);
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
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>				
					<div className="input-username">
						<Field name="email" 
									 component={renderField} 
									 type="text"
									 label="Email" />

						<Field name="username" 
									 component={renderField} 
									 type="text"
									 label="Username" />
					</div>
					<div className="input-password">
						<Field name="password" 
									 component={renderField} 
									 type="password"
									 label="Password" />
					</div>
					{this.renderAlert()}
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

export default connect(mapStateToProps, { registerWithReference })(form(Register));


