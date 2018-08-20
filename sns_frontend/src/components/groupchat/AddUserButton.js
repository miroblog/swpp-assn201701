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


class AddUserButton extends Component {
	constructor(props){
		super(props);
    this.onClick = this.onClick.bind(this);
    this.close = this.close.bind(this);
    this.performAdd = this.performAdd.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      show: false,
	  addedusers: [],
	  checked: [],
    };
	}

  onClick() {
		this.setState({show: true});
  }

  close() {
    this.setState({show: false});
	console.log(this.state);
  }

  performAdd() {
	console.log(this.state.addedusers)
    this.props.dispatch( {
      type: "ADD_USER_GROUP",
      users: this.state.addedusers
    })
	console.log(this.state);
	let users = [];
	let empty = [];
	this.setState({addedusers: users});
	this.setState({checked: empty});
    this.close();
  }

  addUser(user) {
    console.log("add");
    let users = this.state.addedusers;
	let checkedstate = this.state.checked;
    let index = users.indexOf(user);
	if(index > -1)
		return;
	if(user != undefined)
	    users.push(user);
    index = users.indexOf(user);
	console.log(users);
	console.log(index);
	checkedstate[index] = true;
	console.log(checkedstate)
	this.setState({checked: checkedstate});
    this.setState({addedusers: users});

    console.log(this.state.addedusers);
  }

  removeUser(user) {
    console.log("remove");
    let users = this.state.addedusers;
    let index = users.indexOf(user);
	let checkedstate = this.state.checked;
    if(index > -1) {
      users.splice(index, 1);
	  checkedstate.splice(index, 1);
    }
	console.log(checkedstate);
	this.setState({checked: checkedstate});
	console.log(checkedstate);
    this.setState({addedusers: users});
  }

  onChange(event) {
    const target = event.target;
    const value = target.value;
	console.log(target);
	console.log(target.checked);
    if (target.checked) {
      this.addUser(value);
    }
    else {
      this.removeUser(value);
    }
  }
  user(user, key) {
    var user_id = 'user_'+key;
	if(user.username == this.props.user)
		return;
	var index = this.state.addedusers.indexOf(user.username);
	const {isChecked} = this.state.checked[index]?true:false;
	for(let i = 0 ; i < this.props.partners.length ; i++){
		if (user.username == this.props.partners[i]){
			return;
		}
	}
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" onChange={this.onChange} value={user.username} defaultChecked={false} checked={isChecked}/>
          <a id={user_id}>{user.username}</a>
        </label>
      </div>
    );
  }

  renderUsers() {
    var users = [];
    for ( let i=0; i<this.props.users.length; i++) {
		var user = this.props.users[i];
      users.push( this.user(user, i) );
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

      <a id={"addUserBtn"} onClick={this.onClick}> + Add More User </a>

			<Modal isOpen={this.state.show}
      onRequestHide={this.close}>

      <ModalHeader>
      <ModalClose onClick={this.close}/>
      <ModalTitle>Add more user to this chat!</ModalTitle>
      </ModalHeader>

      <ModalBody>
        {this.renderUsers()}
      </ModalBody>

      <ModalFooter>
      <button id='cancel' className='btn btn-default' onClick={this.close}>
      cancel
      </button>
      <button id='Add' className='btn btn-primary' onClick={this.performAdd}>
      Add
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
    partners: state.groupchat.users,
	};
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddUserButton);
