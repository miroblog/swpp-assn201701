import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';

class ChatButton extends Component {
	constructor(props){
		super(props);
	}

	render(){
		return(
				<button
					id='chat'
					className="btn btn-primary"
					onClick={this.props.onClick}>
					CHAT
				</button>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	};
}

export default connect(mapDispatchToProps)(ChatButton);
