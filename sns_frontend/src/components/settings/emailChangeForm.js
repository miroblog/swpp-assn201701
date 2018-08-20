import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup'
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import validateInput from '../validations/emailChange';

class EmailChangeForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
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
      var email = this.state.email;
      this.props.dispatch({
        type: "EMAIL_CHANGE",
        email
      })
    }
  }

  showResult() {
    let message = '';
    message = this.props.changeSuccessShow ? 'email change success':
              this.props.changeFailShow ? 'email change fail': '';

    return (
      <div>
      <span id="email_result">
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
      id={'email_field'}
      error={errors.email}
      label="Email"
      onChange={this.onChange}
      value={this.state.email}
      field="email"
      />

      <div className="form-group">
      <button
      id={'email_submit'}
      disabled={this.state.invalid}
      className="btn btn-success btn-sm"
      >
      change email
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
        hash: state.auth.hash,
      changeSuccessShow: state.settings.EmailChangeSuccessShow,
      changeFailShow: state.settings.EmailChangeFailShow
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailChangeForm);
