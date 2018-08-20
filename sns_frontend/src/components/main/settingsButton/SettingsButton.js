import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';

class SettingsButton extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
				<button
					id='settings'
					className="btn btn-success"
					onClick={this.props.onClick}>
					SETTINGS
				</button>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	};
}

export default connect(mapDispatchToProps)(SettingsButton);
