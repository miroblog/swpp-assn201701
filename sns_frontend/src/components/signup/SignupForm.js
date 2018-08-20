import React from 'react';
import {connect} from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import validateInput from '../validations/signup';
import reactCSS from 'reactcss'

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: {},
      invalid: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }

  checkUserExists(e) {
      const field = e.target.name;
      const uname = e.target.value;
      var payload = {uname};


        if (uname !== '') {
            this.props.dispatch({ type: "CHECK_USER", payload});
            let errors = this.state.errors;
            let invalid;
            if(this.props.userexists){
                errors[field] = 'There is already a user with name ' + uname;
                invalid = true;
            }else{
                errors[field] = '';
                invalid = false;
            }
            this.setState({ errors, invalid });
        }
    }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    if(e.target.name == "username"){
        this.checkUserExists(e);
    }
  }

  isValid() {
      const { errors, valid } = validateInput(this.state);

      if (!valid) {
          this.setState({ errors });
      }
      return valid;
  }

  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()){
        var uname = this.state.username;
        var upwd = this.state.password;
        var email = this.state.email;
        var payload = {uname, upwd, email};
        this.props.dispatch({
            type: "SIGNUP_REQUEST",
            payload
        });
    }
  }

  render() {
    const styles = reactCSS({
      'default': {
        background: {
          backgroundImage: `url(http://slowalk.co.kr/wp-content/uploads/2014/12/01_%EC%B1%85%EC%83%81%EC%9C%84%EB%8B%AC%EB%A0%A5.jpg)`,
          backgroundSize: 'cover',
          width: '100%',
          height: '100%',
          position: 'fixed',
          padding: '0',
          margin: '0',
          left: '0',
        },
        container: {
          backgroundColor: 'rgba( 255, 255, 255, 0.4)',
          margin: 'auto',
          marginTop: '70px',
          width: '35%',
          paddingTop: '40px',
          paddingBottom: '70px',
          paddingLeft: '70px',
          paddingRight: '70px',
        },
        btn_container: {
          textAlign: 'right',
        },
        signup_btn: {
          display: 'inline',
        },
      }
    });

      if(this.props.signup_redirect == true){
          return(<Redirect to="/" />);
      }
    const { errors } = this.state;
    return (
      <div style={styles.background}>
        <div style={styles.container}>
      <form onSubmit={this.onSubmit}>
        <h1>Join our community!</h1>
        <br/>
        <br/>

        <TextFieldGroup
          id={'username_field'}
          error={errors.username}
          label="Username"
          onChange={this.onChange}
          checkUserExists={this.checkUserExists}
          value={this.state.username}
          field="username"
        />
      <br/>

        <TextFieldGroup
          id={'email_field'}
          error={errors.email}
          label="Email"
          onChange={this.onChange}
          value={this.state.email}
          field="email"
        />
      <br/>
        <TextFieldGroup
          id={'password_field'}
          error={errors.password}
          label="Password"
          onChange={this.onChange}
          value={this.state.password}
          field="password"
          type="password"
        />
      <br/>
        <TextFieldGroup
          id={'password_confirm_field'}
          error={errors.passwordConfirmation}
          label="Password Confirmation"
          onChange={this.onChange}
          value={this.state.passwordConfirmation}
          field="passwordConfirmation"
          type="password"
        />
      <br/>
        <div className="form-group" style={styles.btn_container}>
          <button id={'signup_submit'} disabled={this.state.invalid} className="btn btn-success btn-lg" style={styles.signup_btn}>
            Sign up
          </button>
        </div>
      </form>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return {
        signup_redirect: state.signup.signup_redirect,
        userexists : state.signup.userexists
    };
}


function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
