import React, { Component } from 'react';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';

import ProfileManager from './ProfileManager';

class ProfileManagerContainer extends Component {

	constructor(props) {
		super(props);

		this.state = {
			showEditor: false
		};
	}

	render() {
		let editor;
		this.state.showEditor ? 
			editor = <div className="profile-editor-container">
									<ProfileManager />
								</div> : 
			editor = null;

		return(
			<div>
				<div className="primary-button" 
								onClick={() => this.setState(() => this.state.showEditor ? {showEditor: false} : {showEditor: true})}>Manage Profile</div>
			
				<ReactCssTransitionGroup 
					transitionName="show-editor"
					transitionAppear={true}
					transitionAppearTimeout={500}
					transitionEnter={true}
					transitionEnterTimeout={500}
					transitionLeave={true}
					transitionLeaveTimeout={500}>{editor}
				</ReactCssTransitionGroup>
			</div>
		)
	}
}

export default ProfileManagerContainer;