import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { inviteNewContact } from '../../actions';

const form = reduxForm({
	form: 'inviteNewContact'
});

class ProfileManager extends Component {
	// constructor(props) {
	// 	super(props);
	// }

	handleInviteSubmit(formProps) {
		this.props.inviteNewContact(formProps)
	}

	renderInviteNewContact() {
		const { handleSubmit } = this.props;

		return (
			<div>
				<h3>Invite a new Contact</h3>
				<form onSubmit={handleSubmit(this.handleInviteSubmit.bind(this))}>
					<Field name="contactEmail"
								 component="input"
								 type="text"
								 placeholder="Email" />
					<button type="submit">Send invite</button>
				</form>
			</div>
		);
	}

	render() {
		return (
			<div>
				[Profile Manager]
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

export default connect(mapStateToProps, { inviteNewContact })(form(ProfileManager));


