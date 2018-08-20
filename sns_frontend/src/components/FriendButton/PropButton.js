/**
 * Created by swpp on 02/06/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

class PropButton extends Component {
    constructor(props){
        super(props);
    }
    onClick(){
        var pk = this.props.pk;
        var user = this.props.user;
        this.props.dispatch({
            type: "DELETE_FRIEND_REQUEST",
            pk, user
        });
        this.props.updateUnFriendList(user);
    }
    render(){
        if(this.props.deActivate == true){
            return(
                <button onClick={this.onClick.bind(this)} className="btn btn-warning pull-right btn-sm disabled">
                    UnFriend
                </button>
            );
        }
        else{
            return(
                <button onClick={this.onClick.bind(this)} className="btn btn-warning pull-right btn-sm"  name={"unfriend_"+this.props.user}>
                 UnFriend
                </button>
            );
        }
    }
}

function mapDispatchToProps(dispatch) {
    return{
        dispatch
    };
}

export default connect(mapDispatchToProps)(PropButton);
