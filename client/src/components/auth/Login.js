import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { loginUser, checkForExistingUser, registerUser } from '../../actions';

const form = reduxForm({
	form: 'login'
});

class Login extends Component {

	handleLoginSubmit(formProps) {
		this.props.loginUser(formProps);	
	}

	handleRegisterSubmit(formProps) {
		console.log('@registerUser formProps:', formProps);
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

	renderLogin() {
		return (
			<div>	
				<button type="submit">Login</button>
			</div>
		);
	};

	renderRegister() {
		return (
			<div className="input-username">
				<label>Username</label>
				<Field name="username" component="input" type="text" />
			</div>
		);
	};

	render() {
		const { handleSubmit } = this.props;

		let usernameAvailable;

		this.props.email === 'Username is available!' ? usernameAvailable = true : usernameAvailable = false;

		return (
			<div>
				<div>{usernameAvailable ? <h3>Register</h3> : <h3>Login</h3>}</div>
				
				<form onSubmit={usernameAvailable ? handleSubmit(this.handleRegisterSubmit.bind(this)) : handleSubmit(this.handleLoginSubmit.bind(this))}>

					<div className="input-email">			
						<label>Email</label>
						<Field name="email" 
									 component="input" 
									 type="text" 
									 onChange={this.props.checkForExistingUser.bind(this)} />
					</div>

					<div className="input-password">
						<label>Password</label>
						<Field name="password" component="input" type="password" />
					</div>

					{
						usernameAvailable ?
						<div className="input-username">
							<label>Username</label>
							<Field name="username" component="input" type="text" />
						</div>
						: null
					}

					<div>	
						{usernameAvailable ? <button type="submit">Register</button> : <button type="submit">Login</button>}
					</div>

					

				</form>
				{this.renderAlert()}
			</div>
			
		);
	};
};

function mapStateToProps(state) {
	// console.log('state:', state);
	return {
		errorMessages: state.auth.error,
		message: state.auth.error,
		email: state.user.email
	}
};

export default connect(mapStateToProps, { loginUser, checkForExistingUser, registerUser })(form(Login));

