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
										 author={message.author._id}/>
					))}
			</ul>
		);
	}
}

export default MessageList;