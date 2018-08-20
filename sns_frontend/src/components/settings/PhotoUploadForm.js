import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup'
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import NsfwDetectedPopup from './NsfwDetectedPopup'
import Style from 'style-it';

//import ReactCoreImageUpload from 'react-core-image-upload';

class PhotoUploadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: null
    }

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.clearContents = this.clearContents.bind(this);
  }

  clearContents(element) {
    element.value = null;
  }

  onSubmit(e) {
    e.preventDefault();
    //console.log('onSubmit of photo upload form');
    //console.log( this.state.photo );
    this.props.dispatch({
      type: "PROFILE_IMAGE_UPLOAD",
      photo: this.state.photo
    })

    var photo_element = this.refs.photo;
    this.clearContents(photo_element);
    this.setState({
      photo: null
    })
  }

  onChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let photo = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        photo: photo
      })
    }

    reader.readAsDataURL(photo);
    //console.log(photo);
  }

  showResult() {
    let message = '';
    message = this.props.uploadSuccessShow ? 'photo Upload Success':
              this.props.uploadFailShow? 'photo Upload Fail' : '';
    //console.log( 'here is showResult' );
    //console.log( 'props: ' + this.props.uploadSuccessShow );

    return (
        <span id="photo_result">
      { message }
      </span>
    );
  }

  render() {
      return (
        <Style>
            {`.custom-file-upload {
    border: 1px solid #ccc;
    display: inline-block;
    padding: 6px 12px;
    cursor: pointer;
}
            `}
        <div className="row">
          <div className="col-md-9 col-md-offset-0">
            <div class="col-lg-4 col-lg-offset-2 col-md-4 col-md-offset-0 col-sm-5"><img style={{width:'100%', border:"0", alt:"Null"}} src="https://www.reincubate.com/res/reincubate/i/icon_avatar-male.png"/>
              <label className="custom-file-upload">
                <input id="photo_input" ref="photo" className="fileInput" type="file" onChange={this.onChange}/>
              </label>
            <form onSubmit={this.onSubmit}>
              <div style={{'display':'inline'}} className="form-group">
                <button id={'photo_submit'} className="btn btn-success" >
                  Upload
                </button></div>
              <p style={{'margin-left':"1em", 'display':'inline'}} className="help-block">Upload to Server</p>
            </form>
                {this.showResult()}
              <NsfwDetectedPopup nsfwDetected={this.props.nsfwDetected}/>
          </div>
        </div>
        </div>
    </Style>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        hash: state.auth.hash,
      uploadSuccessShow: state.settings.photoUploadSuccessShow,
      uploadFailShow: state.settings.photoUploadFailShow,
      nsfwDetected: state.settings.nsfwPhotoDetected
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PhotoUploadForm);
