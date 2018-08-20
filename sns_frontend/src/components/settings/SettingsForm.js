import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup'
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';

import PhotoUploadForm from './PhotoUploadForm';
import UserInfoForm from './UserInfoForm';
import reactCSS from 'reactcss';

class SettingsForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
      const styles = reactCSS({
          'default': {
              container: {
                  margin: 'auto',
                  marginTop: '100px',
                  width: '35%',
                  paddingTop: '40px',
                  paddingBottom: '70px',
                  paddingLeft: '30px',
                  paddingRight: '70px',
              },
              profile: {
                  marginTop: '65px',
                  paddingTop: '120px',
                  paddingBottom: '70px',
                  paddingLeft: '70px',
                  paddingRight: '30px',
              },
              bigBox:{
                  width: '100%',
                  backgroundColor: 'rgba( 255, 255, 255, 0.05)',
                  overflow:'auto',
                  backgroundSize: 'cover',
                  backgroundAttachment: 'fixed',
                  position: 'fixed',
                  overflowY: 'auto',
                  height: '100%',
                  padding: '0',
                  margin: '0',
                  left: '0',
              }
          }
      });
    return (
      <div style={styles.bigBox} >
          <div style={styles.profile} className="col-lg-4 col-lg-offset-2 col-md-5-offset-2 col-sm-5-offset-2">
              <PhotoUploadForm />
          </div>
          <div  style={styles.container} className="col-lg-5 col-md-7 col-sm-7">
            <div className="media well" style={{"backgroundColor": "#fff"}}>
              <UserInfoForm />
            </div>
          </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        hash: state.auth.hash,
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsForm);
