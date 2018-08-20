import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';

class Logout extends Component {
	constructor(props){
		super(props);
		this.onLogout = this.onLogout.bind(this);
	}
	onLogout(e){
		e.preventDefault();
		this.props.dispatch({
			type: "LOGOUT"
		});
	}
	render(){
		return(
				<button
					id={'logout'}
					className="btn btn-danger btn-sm"
					onClick={this.onLogout}
					>LOGOUT
				</button>
		);
	}
}
		
function mapDispatchToProps(dispatch) {
	return{
		dispatch
	};
}

export default connect(mapDispatchToProps)(Logout);
