import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Field, reduxForm } from 'redux-form';
import './MessagingForm.css';

const form = reduxForm({
	form: 'replyMessage'
});

const renderField = field => (
	<div>
		<input autoComplete="off" { ...field.input } />
	</div>
);

class MessagingForm extends Component {

	handleFormSubmit(formProps) {
		this.props.postReply(this.props.replyTo, formProps)
	}

	render() {
		const { handleSubmit } = this.props;

		return (
				<form className="message-form" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
					<div className="message-field-container">
						<Field name="composedMessage" 
									 component={ renderField } 
									 type="text" 
									 placeholder="type your message..." />
					</div>
					<div className="message-button-container">
						<button action="submit">Post</button>
					</div>
				</form>
		);
	};
};

function mapStateToProps(state) {
	return {
		composedMessage: state.user.composedMessage
	};
};

export default connect(mapStateToProps, actions)(form(MessagingForm));


