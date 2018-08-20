import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
import {connect} from 'react-redux';
import reactCSS from 'reactcss';

class LoginSignup extends Component {
    refresh(){
        this.props.dispatch({
            type: "REFRESH"
        });
    }
  render() {
    const styles = reactCSS({
      'default': {
        container: {
          textAlign: 'center',
          marginTop: '50px',
        },
        phrase: {
          display: 'inline',
          marginRight: '7px',
        },
        sign_up: {
          display: 'inline',
        },
      },
    });
    return (
      <div style={styles.container}>
        <h4 style={styles.phrase}>Are you not a member yet?</h4>
        <Link id={'signup_page_link'} style={styles.sign_up} onClick={this.refresh.bind(this)} to="signup">Singup Page</Link>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(null, mapDispatchToProps)(LoginSignup);
