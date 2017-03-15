import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../../actions';
import MessagingForm from './MessagingForm';

const form = reduxForm({
	form: 'newConversation'
});

const renderParticipantsField = field => (
	<div>
		<input autoComplete="off" 
					 placeholder="Add participants" 
					 {...field.input} />
	</div>
);

class NewConversation extends Component {
	constructor(props) {
		super(props);

		this.props.viewProfile();
	}

	renderAddContacts() {
		return (
			<div>Add Contacts</div>
		);
	}

	render() {
		return (
			<div>New conversation
				<form>
					<Field name="participants"
								 type="text"
								 component={ renderParticipantsField } />
				</form>
			</div>							
		);
	}
}

function mapStateToProps(state) {
	console.log('@state:', state)
	return {
		contacts: state.user.contacts
	};
};

export default connect(mapStateToProps, actions)(form(NewConversation));