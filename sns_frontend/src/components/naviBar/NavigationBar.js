/*
 * Created by swpp on 21/05/17.
 */
/*
 * Created by swpp on 21/05/17.
 */
import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from "prop-types";
import _ from 'lodash'
import GpsTest from '../gps/GpsTest';
import ViewFriendList from '../FriendButton/ViewFriendList';
import ViewRequest from '../FriendButton/ViewRequest';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';
import SearchFriends from './SearchFriends';
import reactCSS from 'reactcss';

class NavigationBar extends React.Component {
    constructor(props){
        super(props);
        this.state = { refresh:false};
    }
    logout(e) {
        this.props.dispatch({
            type: "LOGOUT"
        });
        this.props.history.push("/");
    }

    onchat(e){
        this.props.dispatch({
            type: "GET_USERS",
            hash: this.props.hash
        });
        this.props.dispatch({
            type: "GET_GROUPS"
        });
        this.props.history.push("/users");
    }
    oncalendar(e){
       /* this.props.dispatch({
            type: "GET_USER_INFO"
        });*/
        this.props.dispatch({
    		type: "GET_SCHEDULES",
    		})
      this.props.dispatch({
        type: "GET_SHARE_SCHEDULES"
      })
        this.props.history.push("/calendar");
    }
    onsettings(e){
        this.props.dispatch({
            type: "GET_USER_INFO"
        });
        this.props.history.push("/settings");
    }
    // yield put(actions.getPosts(hash));
    onwall(e){
        let hash = this.props.hash;
        let owner = this.props.user;
        this.props.dispatch({
            type: "GET_POSTS_WALL",
            hash, owner
        });
        // GET_PROFILE_IMAGES'
        this.props.dispatch({
            type: "GET_PROFILE_IMAGES"
        });
        // GET_MY_FRIENDS
        this.props.dispatch({
            type: "GET_MY_FRIENDS"
        });
        // GET_FRIEND_REQUESTS
        this.props.dispatch({
            type: "GET_FRIEND_REQUEST"
        });

        this.props.history.push("/wall/"+this.props.user);
    }

    onsignup(e) {
        this.props.history.push("/signup");
    }

    onlogin(e) {
        this.props.history.push("/login");
        let hash = this.props.hash;
        let owner = this.props.user;
        this.props.dispatch({
            type: "GET_POSTS_WALL",
            hash, owner
        });
		this.props.dispatch({
			type: "GET_POSTS",
			hash
		});
        // GET_PROFILE_IMAGES'
        this.props.dispatch({
            type: "GET_PROFILE_IMAGES"
        });
        this.props.dispatch({
    		type: "GET_SCHEDULES",
    	})
    }
    onlocation(e) {
        this.props.history.push("/gps");
    }

    onaAddFriend(e){
        let currentPath = this.props.location.pathname;
        let user = currentPath.split("/").pop();
        this.props.dispatch({
            type: "ADD_FRIEND_REQUEST",
            user
        });
    }

    onCancelRequest(e){
        var pk = e.target.id;
        var from_navi_bar = true;
        if(pk == ""){
            var refresh = !(this.state.refresh);
            this.setState({refresh:refresh});
        }

        this.props.dispatch({
            type: "DELETE_SENT_REQUEST",
            pk, from_navi_bar
        });
    }

    onCancelFriend(e){
        let currentPath = this.props.location.pathname;
        let user = currentPath.split("/").pop();
        var from_navi_bar = true;
        var pk = e.target.id;
        if(pk == ""){
            var refresh = !(this.state.refresh);
            this.setState({refresh:refresh});
        }
        this.props.dispatch({
            type: "DELETE_FRIEND_REQUEST",
            pk, user, from_navi_bar
        });
    }


    friendInterface(){

        let currentPath = this.props.location.pathname;
        let wallOwner = currentPath.split("/").pop();
        var friend_buttons = null;


        // check for friend
        var friend_object = this.props.my_friends;
        var friend_object_id = friend_object.id;


        //check for friend requests
        var friend_requests = this.props.friend_requests;
        var my_request_name_list = [];
        var other_request_name_list = [];
        var my_request_list = [];
        var other_request_list = [];
        for(var prop in friend_requests){
            if(friend_requests[prop].user_from == this.props.user){
                my_request_name_list.push(friend_requests[prop].user_to);
                my_request_list.push(friend_requests[prop]);
            }else{
                other_request_name_list.push(friend_requests[prop].user_from);
                other_request_list.push(friend_requests[prop]);
            }
        }

        // additional extraction for friend objects
        var name_list =[];
        const objects = friend_object.friend_list;
        for( var prop in objects){
            name_list.push(objects[prop].friend);
        }

        var isFriend = false;
        if (_.includes(name_list, wallOwner)) {
            isFriend = true;
        }
        var waiting_acceptance = false;
        var request_id = -1;
        for(var prop in my_request_list){
            if(my_request_list[prop].user_to == wallOwner){
                waiting_acceptance = true;
                request_id = my_request_list[prop].id;
                break;
            }
        }


        if(currentPath.indexOf("wall/") != -1){
            if(wallOwner == this.props.user){ // this is my wall
                friend_buttons = (
                    <span>
                        <ViewRequest history={this.props.history} my_request_list={my_request_list} other_request_list={other_request_list} />
                        <ViewFriendList history={this.props.history} friend_object_id={friend_object_id} name_list={name_list}/>
                    </span>
                );

            }
            else{ // should separate cases where we are not friends
                if(isFriend){
                    friend_buttons =(
                        <button name="navi_cancel_friend" id={friend_object_id} onClick={this.onCancelFriend.bind(this)} className="btn btn-default" style={{marginTop:"8px", marginLeft:"4em", marginRight:"4em"}}>
                            <i className="glyphicon glyphicon-user"></i>
                            <i className="glyphicon glyphicon-ok"></i>
                        </button>
                    );
                }
                else{
                    if(waiting_acceptance){
                        friend_buttons =(
                            <button name="navi_cancel_request" id={request_id} onClick={this.onCancelRequest.bind(this)} className="btn btn-default" style={{marginTop:"8px", marginLeft:"4em", marginRight:"4em"}}>
                                <i className="glyphicon glyphicon-transfer"></i>...
                                <i className="glyphicon glyphicon-remove-sign"></i>
                            </button>
                        );
                    }else{
                        friend_buttons =(
                            <button name="navi_add_friends" onClick={this.onaAddFriend.bind(this)} className="btn btn-default" style={{marginTop:"8px", marginLeft:"4em", marginRight:"4em"}}>
                                <i className="glyphicon glyphicon-user"></i>...
                                <i className="glyphicon glyphicon-transfer"></i>
                            </button>
                        );
                    }
                }
            }
        }
        return friend_buttons;
    }

    render() {
      const styles = reactCSS({
        'default': {
          calendargram: {
            display: 'inline-block',
            backgroundColor: 'rgba( 255, 255, 255, 0)',
            border: '0',
            height: '50px',
            padding: '0',
            marginRight: '5px',
          },
          navbar_brand: {
            padding: '0',
            margin: 'auto',
          },
          transparentBtn: {
            backgroundColor: 'Transparent',
            backgroundRepeat:'no-repeat',
            border: 'none',
            cursor:'pointer',
            overflow: 'hidden',
          },
          navBar:{
              marginBottom: "0px",
              backgroundColor: "#88b04b",
              border: "0",
              borderBottom: "1px solid #fffff",
              borderRadius: '0'
          }
        }
      });

        console.log(this.props.location.pathname)
        if(this.props.location.pathname == '/') {
          return null;
        }
        const friend_buttons = this.friendInterface();

        const userLinks = (
            <div>
                <ul className="nav navbar-nav">
                    <a id="navi_add_friends" >{friend_buttons}</a>
                </ul>
                          <SearchFriends />

                <ul className="nav navbar-nav navbar-right">
                    <li><a id="navi_timeline" onClick={this.onlogin.bind(this)} style={{"color": "#fff"}}><span className="glyphicon glyphicon-globe"></span> TimeLine</a></li>
                    <li><a id="navi_chat" onClick={this.onchat.bind(this)} style={{"color": "#fff"}}><span className="glyphicon glyphicon-earphone"></span> Chat</a></li>
					<GpsTest />
                    <li><a id="navi_calendar" onClick={this.oncalendar.bind(this)} style={{"color": "#fff"}}> <span className="glyphicon glyphicon-calendar"></span> Calendar</a></li>
                    <li><a id="navi_settings" onClick={this.onsettings.bind(this)} style={{"color": "#fff"}}> <span className="glyphicon glyphicon-cog"></span> Settings</a></li>
                    <li><a id="navi_logout" onClick={this.logout.bind(this)} style={{"color": "#fff"}}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                </ul>
            </div>
        );

        const guestLinks = (
            <ul className="nav navbar-nav navbar-right">
                <li><a id="navi_signup" onClick={this.onsignup.bind(this)} style={{"color": "#fff"}}><span className="glyphicon glyphicon-user"></span> Sign up</a></li>
                <li><a id="navi_login" onClick={this.onlogin.bind(this)} style={{"color": "#fff"}}><span className="glyphicon glyphicon-log-in"></span> Login</a></li>
            </ul>
        );

        const StartPageLink = (
            <a href="/" className="navbar-brand" style={styles.navbar_brand}><img className="img-thumbnail" src={'http://i.imgur.com/5DL9ZFN.png'} style={styles.calendargram}/><span className="glyphicon glyphicon-calendar" style={{"color": "#fff"}}></span></a>
        );

        const userWallLink = (
            <a id="navi_profile" onClick={this.onwall.bind(this)} className="navbar-brand" style={{"color": "#fff"}}><span className="glyphicon glyphicon-user" style={{"marginRight": "6px"}}></span> {this.props.user}</a>
        );

        return (

            <nav className="navbar navbar-default" style={styles.navBar}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        { this.props.isAuthenticated ? userWallLink : StartPageLink }
                    </div>

                    <div className="collapse navbar-collapse">
                        { this.props.isAuthenticated ? userLinks : guestLinks }
                    </div>
                </div>
            </nav>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        posts: state.get_posts.posts,
        hash: state.auth.hash,
        chatstate: state.chat.valid,
        my_friends: state.friend.my_friends,
        friend_requests : state.friend.friend_requests,
    };
}

function mapDispatchToProps(dispatch) {
    return{
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps )(NavigationBar);
