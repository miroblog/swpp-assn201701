import React from 'react';
import TextFieldGroup from '../common/TextFieldGroup'
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import validateInput from '../validations/login';
import LoginSignup from './LoginSignup'; // logout routine
import reactCSS from 'reactcss';

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      identifier: '',
      password: '',
      errors: {},
        status : false, // login failure status
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  isValid() {
      const { errors, valid } = validateInput(this.state);
      if (!valid) {
          this.setState({ errors });
          return valid;
      }
      return valid;
  }

  retryTrue(){
      var status = true;
      this.setState({status}); // set it to true so that it will check on fail
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
        var uname = this.state.identifier;
        var upwd = this.state.password;
        var payload = {uname, upwd};
        this.props.dispatch({
            type: "LOGIN_REQUEST",
            payload
        });
        setTimeout(this.retryTrue.bind(this), 600);
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
      var status = false; // set it to false when typing new password
      var errors = {};
      this.setState({status, errors});
  }

  render() {
    const styles = reactCSS({
      'default': {
        container: {
          textAlign: 'right',
        },
        login_btn: {
          display: 'inline',
        },
      },
    });
      /*
        error checking : wrong password
        error checking : user not exist
       */



		if(this.props.isAuthenticated != false) {
            return (<Redirect to="/main_page"/>);
        }

      const { errors, identifier, password } = this.state;

      if((this.props.hash != false) && this.state.status){
          errors.password = "password does not match!";
      }else if(this.state.password != ""){ // shouldn't be replaced as it is required field error msg
          errors.password = "";
      }

      return (
          <div>
              <form onSubmit={this.onSubmit}>
                  <h1>Login </h1>
                  <br/>

                  { errors.form && <div className="alert alert-danger">{errors.form}</div> }

                  <TextFieldGroup
                      id={'username_field'}
                      field="identifier"
                      label="Username / Email"
                      value={identifier}
                      error={errors.identifier}
                      onChange={this.onChange}
                  />

                  <TextFieldGroup
                      id={'password_field'}
                      field="password"
                      label="Password"
                      value={password}
                      error={errors.password}
                      onChange={this.onChange}
                      type="password"
                  />

                <div className="form-group" style={styles.container}>
                  <button id={'login_submit'} className="btn btn-success btn-lg" style={styles.login_btn} >Login</button>
                </div>
              </form>

              <LoginSignup />
          </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        user: state.auth.user,
        hash: state.auth.hash,
		isAuthenticated: state.auth.isAuthenticated
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
