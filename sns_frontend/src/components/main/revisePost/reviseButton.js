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


class ReviseButton extends Component {
	constructor(props){
		super(props);
    this.onClick = this.onClick.bind(this);
    this.close = this.close.bind(this);
    this.performRevise = this.performRevise.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = { show: false,
    revise_text: this.props.content};
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

  performRevise() {
    console.log( 'here is performRevise' );
    console.log( 'text: ' + this.state.text );
    this.props.dispatch( {
      type: "REVISE_POST",
      postid: this.props.postid,
      text: this.state.revise_text,
        owner: this.props.owner
    } )
    this.close();
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
    console.log( this.state.revise_text );
  }

	render(){
		return(
      <div style={{"display":"inline"}}>

      <a id={"reviseBtn" + this.props.order} onClick={this.onClick}> revise </a>

			<Modal isOpen={this.state.show}
      onRequestHide={this.close}>

      <ModalHeader>
      <ModalClose onClick={this.close}/>
      <ModalTitle>Revise your post</ModalTitle>
      </ModalHeader>

      <ModalBody>
      <textarea id="revise_text"
      className="form-control"
      rows="5"
      onChange={this.onChange}
      defaultValue={this.props.content}/>
      </ModalBody>

      <ModalFooter>
      <button id='cancel' className='btn btn-default' onClick={this.close}>
      cancel
      </button>
      <button id='confirm' className='btn btn-primary' onClick={this.performRevise}>
      Confirm
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

export default connect(mapDispatchToProps)(ReviseButton);
