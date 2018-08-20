import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';



class ExitGroupchatButton extends Component {
	constructor(props){
		super(props);
	    this.onClick = this.onClick.bind(this);
		this.state = {
			redirect: false,
		}
	}

  onClick() {
	  console.log(this.props.roomid)
	  var roomid = this.props.roomid;
		this.props.dispatch( {
		      type: "EXIT_GROUP",
			  roomid
	    })
		this.setState({redirect: true});
  }

  render(){
    if(this.state.redirect == true){
        return(<Redirect to="/users" />);
    }
		return(
			<button id='exit' onClick={this.onClick} className="btn btn-danger btn-sm" style={{"display": "inline", "marginLeft": "10px"}}>Exit this room</button>
		);
	}
}

function mapStateToProps(state){
	return{
	roomid: state.groupchat.group_id
	};
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ExitGroupchatButton);
