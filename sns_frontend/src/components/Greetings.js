import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
} from 'react-router-dom'
import {connect} from 'react-redux';
import CreatePoll from './poll/CreatePoll';
import VotePoll from './poll/VotePoll';
import ResultPoll from './poll/ResultPoll';
import reactCSS from 'reactcss'
import LoginForm from './login/LoginForm';



class Greetings extends Component {
    refresh(){
        this.props.dispatch({
            type: "REFRESH"
        });
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
          backgroundColor: 'rgba( 255, 255, 255, 0.2)',
          margin: 'auto',
          marginTop: '150px',
          width: '60%',
          display: 'flex',
        },
        box_left: {
          flex: '1',
          paddingTop: '150px',
          paddingBottom: '150px',
          textAlign: 'center',
        },
        box_right: {
          flex: '1',
          backgroundColor: 'rgba( 255, 255, 255, 0.8)',
          border: '1px solid #e6e6e6',
          paddingTop: '50px',
          paddingBottom: '50px',
          paddingLeft: '40px',
          paddingRight: '40px',
        },
        calendargram: {
          display: 'inline-block',
          backgroundColor: 'rgba( 255, 255, 255, 0)',
          border: '0',
          width: '300px',
        },
        phrase: {
          display: 'inline-block',
        },
        login_form: {
          display: 'inline-block',
        }
      },
    });

	  console.log(this.props.isAuthenticated);
	  console.log(this.props.hash);
    return (
      <div style={styles.background}>

        <div style={styles.container}>
          <div style={styles.box_left}>
            <img className="img-thumbnail" src={'http://i.imgur.com/pdwTL46.png'} style={styles.calendargram}/>
            <h4 style={styles.phrase}>Share Schedules with Friends.</h4>
          </div>
          <div style={styles.box_right}>
            <LoginForm style={styles.login_form}/>
          </div>
        </div>
      </div>

    );
  }
}

function mapStateToProps(state){
	return{
		isAuthenticated: state.auth.isAuthenticated,
		hash: state.auth.hash,
	};
}
function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Greetings);
