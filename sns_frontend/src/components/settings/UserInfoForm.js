import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup'
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import EmailChangeForm from './emailChangeForm';
import PasswordChangeForm from './passwordChangeForm';

class UserInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user
    };
  }

  render() {
    //console.log('props.user: '+ this.props.user);
    var username = this.props.user;
    console.log(username);

    return (
      <div>
      <h3> {username}, change your information </h3>
      
      <EmailChangeForm />
      <PasswordChangeForm />

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

export default connect(mapStateToProps, mapDispatchToProps)(UserInfoForm);
