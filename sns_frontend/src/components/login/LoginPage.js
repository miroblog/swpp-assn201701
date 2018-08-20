import React from 'react';
import LoginForm from './LoginForm';
import reactCSS from 'reactcss';

class LoginPage extends React.Component {
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
      }
    });

    return (
      <div className="row" style={styles.background}>
        <div style={styles.container}>

            <LoginForm />

        </div>
      </div>
    );
  }
}

export default LoginPage;
