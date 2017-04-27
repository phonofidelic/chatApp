import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import * as actions from '../../actions';
import MessagingForm from './MessagingForm';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AddNewContactForm from './AddNewContactForm';

injectTapEventPlugin();

const form = reduxForm({
	form: 'newConversation'
});

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



class NewConversation extends Component {
	constructor(props) {
		super(props);

		this.props.viewProfile();	
	}

	renderSelectContactsField() {
		console.log('## this.props.user:', this.props.user)
		if (this.props.contacts) {
			return(
				<Field name="participantsField"
								 type="select"
								 label="Add Participants"
								 component={ renderSelectField }>
					{this.props.contacts.map(contact => 
						<MenuItem value={contact._id} primaryText={contact.profile.username} key={contact._id} />
					)}
				</Field>
			);
		} else {
			return(
				<div>No contacts found</div>
			);
		}
	};

	renderPartisipantsList() {
		if(this.props.contacts) {
			return (
				<div>
					<ul>
						{this.props.contacts.map(contact => {
							<li>{contact.profile.username}</li>
						})}
					</ul>
				</div>
			);
		}
	};

	renderMessageField() {
		return (
			<Field name="messageField"
						 type="textarea"
						 label="Type your message"
						 component={ renderTextField } />
		);
	}

	handleFormSubmit(formProps) {
		console.log('@handleFormSubmit formProps:', formProps);
		this.props.startNewConversation(formProps.participantsField, formProps.messageField)
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div className="new-conversation">New conversation
				<div>{this.renderPartisipantsList()}</div>
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
	console.log('@state:', state)
	return {
		user: state.user.userInfo,
		contacts: state.user.contacts
	};
};

export default connect(mapStateToProps, actions)(form(NewConversation));
