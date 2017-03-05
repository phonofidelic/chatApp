import React, { Component } from 'react';

class Conversation extends Component {

	render() {
		return (
			<div>A conversation goes here
				<a href={'/dashboard'}><button>back</button></a>
			</div>
		);
	}
}

export default Conversation;