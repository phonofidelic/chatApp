import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../actions';
import { Field, reduxForm } from 'redux-form';
import './MessagingForm.css';

const form = reduxForm({
	form: 'replyMessage'
});

const renderField = field => (
	<div className="message-field-container">
		<input className="message-field" autoComplete="off" { ...field.input } />
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
						<Field name="composedMessage" 
									 component={ renderField } 
									 type="text" 
									 placeholder="type your message..." />
					<div className="message-button-container">
						<button className="post-button" action="submit">Post</button>
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


