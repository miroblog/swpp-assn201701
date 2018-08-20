import React from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import reactCSS from 'reactcss'

class UsersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_redirect: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(partner) {
    this.props.dispatch({
      type: "CHAT_START",
      hash: this.props.hash,
      user: this.props.user,
      partner: partner
    });
    this.setState({chat_redirect: true})
  }

  user(user, key) {
    var user_id = 'user_'+key;
    return (
      <a className="list-group-item" onClick={() => this.onClick(user)} key={key}> <a id={user_id}>{user.username}</a> </a>
    );
  }

  renderUsers() {
    var users = [];

    for ( let i=0; i<this.props.users.length; i++) {
      users.push( this.user(this.props.users[i], i) );
    }

    return (
      <div>
        <div className="jumbotron">
          <h3>Choose User you'd like to chat with.</h3>
        </div>
        <div className="list-group">
          {users}
        </div>
      </div>
    );
  }


  render() {

    if(this.state.chat_redirect == true){
        return(<Redirect to="/chat" />);
    }
    return (
      <div>
        {this.renderUsers()}
      </div>

    );
  }
}


function mapStateToProps(state) {
    return {
        hash: state.auth.hash,
        user: state.auth.user
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersForm);
