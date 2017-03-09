import React, { Component } from 'react';
import Message from './Message';

class MessageList extends Component {

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
			</ul>
		);
	}
}

export default MessageList;