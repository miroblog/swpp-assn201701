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

class DeleteButton extends Component {
	constructor(props){
		super(props);
    this.onClick = this.onClick.bind(this);
    this.close = this.close.bind(this);
    this.performDelete = this.performDelete.bind(this);
    this.state = { show: false };
	}

  //$(document).ready( function() {
    //$('#deleteLink').click( function() {
      //$('#deleteWarning').modal('show');
    //} )
  //} )

  onClick() {
		this.setState({show: true});
  }

	close() {
    this.setState({show: false});
  }

  performDelete() {
    this.props.dispatch( {
      type: "DELETE_POST",
      postid: this.props.postid,
        owner: this.props.owner
    } )
    this.close();
  }

	render(){
		return(
      <div style={{"display":"inline"}}>

      <a id={"deleteBtn" + this.props.order} onClick={this.onClick}> delete </a>

      <Modal isOpen={this.state.show}
      onRequestHide={this.close}>

      <ModalHeader>
      <ModalClose onClick={this.close} />
      <ModalTitle> Delete Warning </ModalTitle>
      </ModalHeader>

      <ModalBody>
        <p> Do you really want to delete this post? </p>
      </ModalBody>

      <ModalFooter>
      <button id="no" className='btn btn-default' onClick={this.close}>
      no
      </button>
      <button id="yes" className='btn btn-primary' onClick={this.performDelete}>
      yes
      </button>
      </ModalFooter>

      </Modal>

      </div>

		);
	}
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	};
}

export default connect(mapDispatchToProps)(DeleteButton);
