import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../../actions';

class ProfileManager extends Component {

	constructor(props) {
		super(props);
	}

	render() {

		return(
			<div>
				This will be the editor!
			</div>
		)
	}
}

export default ProfileManager;