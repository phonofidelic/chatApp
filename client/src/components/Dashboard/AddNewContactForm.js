import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { inviteNewContact } from '../../actions';
import TextField from 'material-ui/TextField';

const form = reduxForm({
	form: 'inviteNewContact'
});

// TODO: move to a service? (also implememnted in Login.js, NewConversation.js)
const validate = {};
validate.required = value => value ? undefined : 'Required';
validate.email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;

const renderEmailField = ({input, label, meta: { touched, error }, children, ...custom}) => (
	<TextField
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		onChange={(event, value) => {input.onChange(value)}}
		{...custom} />
)

const inputStyle = {
	textAlign: 'left'
}

class AddNewContactForm extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	handleInviteSubmit(formProps) {
		this.props.inviteNewContact(formProps)
	}

	renderInviteNewContact() {
		const { handleSubmit } = this.props;

		return (
			<div className="add-new-contact-container">
				<p>Invite a new Contact</p>
				<form onSubmit={handleSubmit(this.handleInviteSubmit.bind(this))}>
					<div className="input-field-container">
						<Field name="contactEmail"
									 component={renderEmailField}
									 type="email"
									 label="Email"
									 style={inputStyle}
									 validate={[validate.required, validate.email]} />
					</div>
					<button className="secondary-button" type="submit">Send invite</button>
				</form>
			</div>
		);
	}

	render() {
		return (
			<div>
				{this.renderInviteNewContact()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		inviteStatus: state.user.inviteStatus
	}
};

export default connect(mapStateToProps, { inviteNewContact })(form(AddNewContactForm));


