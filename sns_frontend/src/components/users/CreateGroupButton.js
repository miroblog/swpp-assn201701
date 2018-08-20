import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';

//import Modal, {closeStyle} from 'simple-react-modal';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';


class CreateGroupButton extends Component {
	constructor(props){
		super(props);
    this.onClick = this.onClick.bind(this);
    this.close = this.close.bind(this);
    this.performCreate = this.performCreate.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      show: false,
      users: []
    };
	}

  onClick() {
		this.setState({show: true});
  }

  close() {
    this.setState({show: false});
  }

  performCreate() {
    this.props.dispatch( {
      type: "CREATE_GROUP",
      users: this.state.users
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
          <input type="checkbox" onChange={this.onChange} value={user.username}/>
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
		return(
      <div>

      <a id={"createGroupBtn"} onClick={this.onClick}> + Create a group chat </a>

			<Modal isOpen={this.state.show}
      onRequestHide={this.close}>

      <ModalHeader>
      <ModalClose onClick={this.close}/>
      <ModalTitle>Choose users you'd like to chat with</ModalTitle>
      </ModalHeader>

      <ModalBody>
        {this.renderUsers()}
      </ModalBody>

      <ModalFooter>
      <button id='cancel' className='btn btn-default' onClick={this.close}>
      cancel
      </button>
      <button id='Create' className='btn btn-primary' onClick={this.performCreate}>
      Create
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
    user: state.auth.user
	};
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateGroupButton);
