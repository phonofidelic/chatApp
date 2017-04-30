import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser, checkForExistingUser, registerUser } from '../../actions';
import TextField from 'material-ui/TextField';

const form = reduxForm({
	form: 'login'
});

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
	<TextField
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		{...custom} />
);

class Login extends Component {

	handleLoginSubmit(formProps) {
		this.props.loginUser(formProps);
	}

	handleRegisterSubmit(formProps) {
		this.props.registerUser(formProps);
	}

	renderAlert() {
		if (this.props.errorMessage) {
			return (
				<div>
					<span><strong>Error!</strong> {this.props.errorMessages}</span>
				</div>
			);
		}
	};

	render() {
		const { handleSubmit } = this.props;

		let usernameAvailable;

		this.props.email === 'Username is available!' ? usernameAvailable = true : usernameAvailable = false;

		return (
			<div className="login-container">
				<div className="greeting">{usernameAvailable ? <h3>Register</h3> : <h3>Hello</h3>}</div>
				
				<form onSubmit={usernameAvailable ? handleSubmit(this.handleRegisterSubmit.bind(this)) : handleSubmit(this.handleLoginSubmit.bind(this))}>

					<div className="input-field-container">			
						<label></label>
						<Field name="email" 
									 component={renderTextField} 
									 type="email" 
									 label="Email"
									 onChange={this.props.checkForExistingUser.bind(this)} />
					</div>

					<div className="input-field-container">
						<label></label>
						<Field name="password" 
									 component={renderTextField}
									 type="password" 
									 label="Password" />
					</div>

					{
						usernameAvailable ?
						<div className="input-field-container">
							<label></label>
							<Field name="username" 
										 component={renderTextField}
										 type="text" 
										 label="Username" />
						</div>
						: null
					}

					<div className="greeting">{this.renderAlert()}</div>
					<div className="auth-button" style={{marginTop: '80px'}}>	
						{usernameAvailable ? <button className="secondary-button" type="submit">Register</button> : <button className="secondary-button" type="submit">Login</button>}
					</div>

					

				</form>
			</div>
			
		);
	};
};

function mapStateToProps(state) {
	// console.log('state:', state);
	return {
		errorMessages: state.auth.error,
		message: state.auth.error,
		email: state.auth.email
	}
};

export default connect(mapStateToProps, { loginUser, checkForExistingUser, registerUser })(form(Login));

