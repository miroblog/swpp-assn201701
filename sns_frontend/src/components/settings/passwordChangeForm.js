import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup'
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import validateInput from '../validations/passwordChange';

class PasswordChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      old_password: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      invalid: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  isValid() {
    const { errors, valid } = validateInput(this.state);

    if (!valid) {
      this.setState({errors});
    }
    return valid;
  }

  onSubmit(e) {
    e.preventDefault();
    if ( this.isValid() ) {
      var old_password = this.state.old_password;
      var new_password = this.state.password;
      this.props.dispatch({
        type: "PASSWORD_CHANGE",
        old_password,
        new_password
      });
      const hash = new Buffer(`${this.props.user}:${new_password}`).toString('base64');
      this.props.dispatch({
        type: "AUTH_OK",
        hash: hash,
        uname: this.props.user,
        userid: this.props.userid 
      })

    }
  }

  showResult() {
    let message = '';
    message = this.props.changeSuccessShow ? 'password change success':
              this.props.changeFailShow ? 'password change fail': '';

    return (
      <div>
      <span id="password_result">
      { message }
      </span>
      </div>
    );
  }

  render() {
    const { errors } = this.state;
    return (
      <div>
      <form onSubmit={this.onSubmit}>

      <TextFieldGroup
      id={'old_password_field'}
      error={errors.old_password}
      label="Current Password"
      onChange={this.onChange}
      value={this.state.old_password}
      field="old_password"
      type="password"
      />

      <TextFieldGroup
      id={'password_field'}
      error={errors.password}
      label="Password"
      onChange={this.onChange}
      value={this.state.password}
      field="password"
      type="password"
      />

      <TextFieldGroup
      id={'password_confirm_field'}
      error={errors.passwordConfirmation}
      label="Password Confirmation"
      onChange={this.onChange}
      value={this.state.passwordConfirmation}
      field="passwordConfirmation"
      type="password"
      />


      <div className="form-group">
      <button
      id={'password_submit'}
      disabled={this.state.invalid}
      className="btn btn-success btn-sm"
      >
      change password
      </button>
      </div>

      </form>
      { this.showResult() }
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
      userid: state.auth.userid,
        hash: state.auth.hash,
      changeSuccessShow: state.settings.PasswordChangeSuccessShow,
      changeFailShow: state.settings.PasswordChangeFailShow
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PasswordChangeForm);
