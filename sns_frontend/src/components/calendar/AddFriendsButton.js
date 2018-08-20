import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


class AddFriendsButton extends Component {
	constructor(props){
		super(props);
    this.onClick = this.onClick.bind(this);
    this.close = this.close.bind(this);
    this.performSelect = this.performSelect.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      show: false,
      users: []
    };
	}

  onClick() {
    this.props.dispatch({
      type: "GET_USERS",
      hash: this.props.hash
    });
 
		this.setState({show: true});
  }

  close() {
    this.setState({show: false});
  }

  performSelect() {
    //console.log( 'here is perform select' );
    //console.log( this.state.users );
    this.props.dispatch( {
      type: "SELECT_FRIENDS",
      friends: this.state.users
    })
    this.close();
  }

  addUser(user) {
    console.log("add");
    console.log(user);
    let users = this.state.users;
    users.push(user)
    this.setState({users: users});
    console.log(this.state.users);
  }

  removeUser(user) {
    console.log("remove");
    console.log(user);
    let users = this.state.users;
    let index = users.indexOf(user);
    if(index > -1) {
      users.splice(index, 1);
    }
    this.setState({users: users});
      console.log(this.state.users);
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;

    if (target.checked) {
      this.addUser(value);
    }
    else {
      this.removeUser(value);
    }
  }

  user(user, key) {
    var user_id = 'user_'+key;
    if (user.username == this.props.user) {
      return ;
    }
    return (
      <div className="checkbox">
        <label>
          <input id={'check_'+user.username} type="checkbox" onChange={this.onChange} value={user.username}/>
          <a id={user_id}>{user.username}</a>
        </label>
      </div>
    );
  }

  renderUsers() {
   
    var users = [];

    for ( let i=0; i<this.props.users.length; i++) {
      users.push( this.user(this.props.users[i], i) );
    }

    return (
      <div>
        <form>
          {users}
        </form>
      </div>
    );
  }

  render(){
    console.log("schedule - select btn rendered")

		return(
      <div>

      <a id={"addFriendsBtn"} onClick={this.onClick}> + Add Friends to be with </a>

			<Modal isOpen={this.state.show}
      onRequestHide={this.close}>

      <ModalHeader>
      <ModalClose onClick={this.close}/>
      <ModalTitle>Choose friends you'd like to invite </ModalTitle>
      </ModalHeader>

      <ModalBody>
        {this.renderUsers()}
      </ModalBody>

      <ModalFooter>
      <button id='cancel' className='btn btn-default' onClick={this.close}>
      cancel
      </button>
      <button id='select' className='btn btn-primary' onClick={this.performSelect}>
      select
      </button>
      </ModalFooter>
      </Modal>

      </div>

		);
	}
}

function mapStateToProps(state){
	return{
    users: state.get_users.users,
    user: state.auth.user,
    hash: state.auth.hash
	};
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendsButton);
