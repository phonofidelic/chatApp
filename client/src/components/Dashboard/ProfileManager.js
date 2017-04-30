import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import TextField from 'material-ui/TextField';

import * as actions from '../../actions';

const form = reduxForm({
	form: 'editProfile'
});

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
	<TextField
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		onChange={(event, value) => {input.onChange(value)}}
		{...custom} />
);

class ProfileManager extends Component {

	constructor(props) {
		super(props);
	}

	handleFormSubmit(formProps) {
		this.props.saveProfileChanges(formProps.username)
	}

	render() {
		const { handleSubmit } = this.props;
		return(
			<div className="profile-editor component-container">
				<p className="debug"> TODO: add avatar upload/select</p>
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<div className="input-field-container">
						<Field name="username"
									 type="text"
									 label="Username"
									 component={ renderTextField } />
					</div>
					<button className="secondary-button" action="submit">Save changes</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		userInfo: state.user.userInfo
	}
}

export default connect(mapStateToProps, actions)(form(ProfileManager));

