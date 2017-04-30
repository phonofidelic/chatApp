import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AddNewContactForm from './AddNewContactForm';

injectTapEventPlugin();

const form = reduxForm({
	form: 'newConversation'
});

// TODO: move to a service? (also implememnted in Login.js, AddNewConversation.js)
const validate = {};
validate.required = value => value ? undefined : 'Required';

const renderSelectField = ({ input, label, meta: { touched, error }, children, ...custom }) => (
	<SelectField
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		onChange={(event, index, value) => input.onChange(value)}
		children={children}
		multiple={true}
		{...custom} />
);

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
	<TextField
		floatingLabelText={label}
		errorText={touched && error}
		{...input}
		onChange={(event, value) => {input.onChange(value)}}
		{...custom} />
);

const inputStyle = {
	textAlign: 'left'
}

class NewConversation extends Component {
	constructor(props) {
		super(props);

		this.props.viewProfile();	
	}


	renderSelectContactsField() {
		if (this.props.contacts) {
			return(
				<div className="input-field-container">
					<Field name="participantsField"
								 style={inputStyle}
								 type="select"
								 label="Add Participants"
								 component={ renderSelectField }>
						{this.props.contacts.map(contact => 
							<MenuItem value={contact._id} primaryText={contact.profile.username} key={contact._id} />
						)}
					</Field>
				</div>
			);
		} else {
			return(
				<div>No contacts found</div>
			);
		}
	};

	renderMessageField() {
		return (
			<div className="input-field-container">
				<Field name="messageField"
							 style={inputStyle}
							 type="textarea"
							 label="Type your message"
							 autoComplete="off"
							 validate={[validate.required]}
							 component={ renderTextField } />
			</div>
		);
	}

	handleFormSubmit(formProps) {
		this.props.startNewConversation(formProps.participantsField, formProps.messageField)
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="new-conversation">
				<form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				{ this.renderSelectContactsField() }
				{ this.renderMessageField() }
				<button className="secondary-button" action="submit">Post</button>
				</form>
				<AddNewContactForm />
			</div>				
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user.userInfo,
		contacts: state.user.contacts
	};
};

export default connect(mapStateToProps, actions)(form(NewConversation));

