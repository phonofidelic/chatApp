import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Message from './Message';

class MessageList extends Component {

	componentDidMount() {
		this.scrollToBottom();
	};

		componentDidUpdate() {
		this.scrollToBottom();
	};

	scrollToBottom() {
		const node = ReactDom.findDOMNode(this.messagesEnd);
		node.scrollIntoView({ behavior: "smooth" });
	}

	render() {
		return (
			<ul>
					{this.props.displayMessages.map(message => (
						<Message key={message._id}
										 createdAt={message.createdAt} 
										 body={message.body}
										 authorId={message.author._id}
										 author={message.author.profile.username} />
					))}
					<div style={ { float: "left", clear: "both", height: "50px" } }
							 ref={ (el) => {this.messagesEnd = el; } }></div>
			</ul>
		);
	}
}

export default MessageList;