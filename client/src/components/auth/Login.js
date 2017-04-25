import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import { loginUser, checkForExistingUser, registerUser } from '../../actions';
import './Login.css';

const form = reduxForm({
	form: 'login'
});

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

					<div className="input-email">			
						<label></label>
						<Field name="email" 
									 component="input" 
									 type="text" 
									 placeholder="Email"
									 onChange={this.props.checkForExistingUser.bind(this)} />
					</div>

					<div className="input-password">
						<label></label>
						<Field name="password" 
									 component="input" 
									 type="password" 
									 placeholder="Password" />
					</div>

					{
						usernameAvailable ?
						<div className="input-username">
							<label></label>
							<Field name="username" 
										 component="input" 
										 type="text" 
										 placeholder="Username" />
						</div>
						: null
					}

					<div className="greeting">{this.renderAlert()}</div>
					<div className="auth-button">	
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

