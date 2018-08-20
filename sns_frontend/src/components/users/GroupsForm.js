import React from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';

import CreateGroupButton from './CreateGroupButton';

class GroupsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chat_redirect: false
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(group_id, users) {
    this.props.dispatch({
      type: "GROUPCHAT_START",
      group_id,
      users
    });
    this.setState({chat_redirect: true})
  }

  group(group, key) {
    var group_id = 'group_'+key;
    var users = '';
	  var time = group.time.substring(0,16);
    time = time.replace("T", " ");

    for (let i =0; i<group.user.length; i++) {
      users = users + group.user[i].username + ' ';
    }
    return (
      <a className="list-group-item" onClick={() => this.onClick(group.id, group.user)} key={key}>
		<a id={group_id}>{users}</a>
		<span className="badge pull-right">
			<strong>since {time}</strong></span>
	  </a>
    );
  }


  renderGroups() {
    var groups = [];

    for ( let i=0; i<this.props.groups.length; i++) {
      groups.push( this.group(this.props.groups[i], i) );
    }

    return (
      <div>
        <div className="jumbotron">
          <h3>Choose Group you'd like to chat with.</h3>
          <CreateGroupButton/>
        </div>
        <div className="list-group">
          {groups}
        </div>
      </div>
    );
  }


  render() {
    if(this.state.chat_redirect == true){
        return(<Redirect to="/groupchat" />);
    }
    return (
      <div>
        {this.renderGroups()}
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

export default connect(mapStateToProps, mapDispatchToProps)(GroupsForm);
