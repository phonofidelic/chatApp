import React, { Component } from 'react';
import { connect } from 'react-redux';
import ReactCssTransitionGroup from 'react-addons-css-transition-group';
import * as actions from '../../actions';

import ProfileManager from './ProfileManager';

class ProfileManagerContainer extends Component {

	constructor(props) {
		super(props);


		this.state = {
			showEditor: false
		};
	}

	toggleProfileEditor() {
		this.props.toggleProfileEditor();
	};

	render() {
		
		let editor;
		this.props.showProfileEditor ? 
			editor = <div className="profile-editor-container">
									<ProfileManager />
								</div> : 
			editor = null;

		return(
			<div>
				<div className="primary-button" 
								onClick={() => this.toggleProfileEditor()}>Manage Profile</div>
			
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

function mapStateToProps(state) {
	return {
		showProfileEditor: state.user.showProfileEditor
	};
};

export default connect(mapStateToProps, actions)(ProfileManagerContainer);

