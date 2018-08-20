import React from 'react';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import reactCSS from 'reactcss';
import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap';
import Style from 'style-it';

class SearchFriends extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: null,
      redirect: false,
      destination: null
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.close = this.close.bind(this);
    this.result = this.result.bind(this);
    this.renderUsers = this.renderUsers.bind(this);
    this.user = this.user.bind(this);
    this.onClick = this.onClick.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  onChange(e) {
    this.setState({
      searchValue: e.target.value
    });
    //console.log( this.state.searchValue );
  }

  onSubmit(e) {
    e.preventDefault();
    //console.log( 'onsubmit state.searchvalue: ' + this.state.searchValue );
    let searchValue = this.state.searchValue;
    this.props.dispatch( {
      type: "SEARCH_FRIENDS",
      searchValue
    } )
  }

  close() {
    this.props.dispatch( {
      type: "SEARCH_RESULT_CLOSE"
    } )
  }

  onClick(username) {
    this.props.dispatch({
      type: "GET_PROFILE_IMAGES"
    });
    let hash = this.props.hash;
    let owner = username;
    this.props.dispatch({
      type: "GET_POSTS_WALL",
      hash, owner
    })

    this.setState({
      redirect: true,
      destination: username
    });
    this.close();
    //console.log( 'onclick' );
    //console.log( 'redirect: ' + this.state.redirect );
    //console.log( 'destination: ' + this.state.destination );
  }

  user( object, key ) {
    return (
    <a id={'search_result_user' + key}
      className="list-group-item"
      key={key}
      onClick={ () => this.onClick(object.username)}>

      { object.username }
    </a>
    );
  }

  renderUsers() {
    let usernames = [];
    for ( let i=0; i<this.props.searchResult.length; i++ ) {
      usernames.push( this.user(this.props.searchResult[i], i) );
    }

    return (
      <div className="list-group">
        {usernames}
      </div>
    );
  }

  result() {
    //console.log( this.props.searchResult.length );
    console.log( 'this.props.searchResult: ' + this.props.searchResult);
    console.log( 'this.props.showResult: ' + this.props.showResult);
    if ( this.props.searchResult.length == 0 ) {
      return (
      <div id="search_fail_message">
        There is no matching username.  
      </div>
      );
    }

    return (
      <div>
      { this.renderUsers() }
      </div>
    );
  }

  resetState() {
    this.setState({
      searchValue: null,
      redirect: false,
      destination: null
    })
  }

  render() {


    if ( this.state.redirect ) {
      let destUrl = "/wall/" + this.state.destination;
      this.resetState();
      return (
        <Redirect to={destUrl} />
      );
    }

    return (
    <Style>
        {`
.btnSearch{
    width: 180px;
    box-sizing: border-box;
    border: 2px solid #ccc;
    border-radius: 4px;
    font-size: 15px;
    background-color: white;
    background-image: url('https://www.w3schools.com/howto/searchicon.png');
    background-position: 7px 7px;
    background-repeat: no-repeat;
    padding: 4px 4px 4px 40px;
    -webkit-transition: width 0.4s ease-in-out;
    transition: width 0.4s ease-in-out;
}

.btnSearch:focus {
    width: 105%;
}
      `}
      <div>
        <form className="navbar-form navbar-nav"
              onSubmit={this.onSubmit}>

          <input id="search_bar"
                 type="text"
                 className="btnSearch"
                 placeholder="Search Friends"
                 onChange={this.onChange}>
          </input>
        </form>

        <Modal isOpen={this.props.showResult}
               onRequestHide={this.close}>

          <ModalHeader>
            <ModalClose id="search_result_close_btn"
                        onClick={this.close} />
            <ModalTitle> Search Result </ModalTitle>
          </ModalHeader>

          <ModalBody>
              {this.result()}
          </ModalBody>

          <ModalFooter>
            <button id="search_result_ok_btn"
                    className="btn btn-default"
                    onClick={this.close}>
              ok
            </button>
          </ModalFooter>

        </Modal>
      </div>
    </Style>
    );
  }
}

function mapStateToProps(state) {
    return {
      showResult: state.search.showResult,
      searchResult: state.search.users,
      hash: state.auth.hash
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchFriends);
