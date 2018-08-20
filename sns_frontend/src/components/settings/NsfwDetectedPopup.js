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

class NsfwDetectedPopup extends Component {
	constructor(props){
		super(props);
    this.close = this.close.bind(this);
	}

  close() {
		this.props.dispatch({ type: "NSFW_DETECTED_CONFIRM" });
  }

  render(){
		return(
      <div>

			<Modal isOpen={this.props.nsfwDetected}
      onRequestHide={this.close}>

      <ModalHeader>
      <ModalClose onClick={this.close}/>
      <ModalTitle>Request Rejected</ModalTitle>
      </ModalHeader>

      <ModalBody>

				<div className="alert alert-danger" role="alert">
					<h2><span className="glyphicon glyphicon-ban-circle" ariaHidden="true"></span></h2>
					<h3 id='nsfwPopupText'>Not Safe for Work Image Detected.</h3>
					<br/>
					<p id='probability'>{'Machine predicted probability: ' + this.props.nsfwProbability + '%'}</p>
				</div>
      </ModalBody>

      <ModalFooter>
      <button id='Confirm' className='btn btn-danger' onClick={this.close}>
      Confirm
      </button>
      </ModalFooter>
      </Modal>

      </div>

		);
	}
}


function mapStateToProps(state){
	return{
    nsfwProbability: state.settings.nsfwProbability
	};
}

function mapDispatchToProps(dispatch) {
	return{
		dispatch
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(NsfwDetectedPopup);
