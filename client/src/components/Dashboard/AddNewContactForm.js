import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { inviteNewContact } from '../../actions';

const form = reduxForm({
	form: 'inviteNewContact'
});

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
					<Field name="contactEmail"
								 component="input"
								 type="email"
								 placeholder="Email" />
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


