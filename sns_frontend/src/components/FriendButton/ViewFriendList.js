/**
 * Created by swpp on 02/06/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropButton from './PropButton';
import reactCSS from 'reactcss';
//import Modal, {closeStyle} from 'simple-react-modal';
import {
    Modal,
    ModalHeader,
    ModalTitle,
    ModalClose,
    ModalBody,
    ModalFooter
} from 'react-modal-bootstrap';


class ViewFriendList extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.close = this.close.bind(this);
        this.confirm = this.confirm.bind(this);
        this.state = { show: false,
            revise_text: this.props.content, unfriend_list:[]};
    }

    onClick() {
        this.setState({show: true});
    }

    close() {
        this.setState({show: false});
    }
    confirm() {
        this.close();
    }

    contains(a, obj) {
        for(var prop in a){
            if(a[prop] ==obj){
                return true;
            }
        }
        return false;
    }

    updateUnFriendList(name){
        var list = this.state.unfriend_list;
        list.push(name);
        this.setState({unfriend_list:list});
    }

    onwall(e){
        let hash = this.props.hash;
        let owner = e.target.id;
        this.props.dispatch({
            type: "GET_POSTS_WALL",
            hash, owner
        });
        // GET_MY_FRIENDS
        this.props.dispatch({
            type: "GET_MY_FRIENDS"
        });
        // GET_FRIEND_REQUESTS
        this.props.dispatch({
            type: "GET_FRIEND_REQUEST"
        });
        this.props.history.push("/wall/"+owner);
    }

    friendElement(name){
        var pk = this.props.friend_object_id;
        var name_list = this.state.unfriend_list;
        if(this.contains(name_list, name) == false){
            return(
                <li className="list-group-item"><span id={name} onClick={this.onwall.bind(this)}>{name}</span>
                    <span>
                    <PropButton deActivate={false} updateUnFriendList={this.updateUnFriendList.bind(this)} pk={pk} user={name}/>
                </span>
                </li> );
        }else{
            return(
                <li className="list-group-item"><del>{name}</del>
                    <span>
                    <PropButton deActivate={true} updateUnFriendList={this.updateUnFriendList.bind(this)} pk={pk} user={name}/>
                </span>
                </li> );
        }
    }

    renderFriend(){
        var list = [];
        for(var prop in this.props.name_list){
            list.push(this.friendElement(this.props.name_list[prop]));
        }
        return(
            <ul className="list-group">
                {list}
            </ul>
        );
    }

    render(){

        const styles = reactCSS({
            'default': {
                transparentBtn: {
                    backgroundColor: 'Transparent',
                    backgroundRepeat:'no-repeat',
                    cursor:'pointer',
                    overflow: 'hidden',
                    marginTop:"8px",
                    marginRight:"2em",
                    color: 'white',
                    fontFamily: "Roboto",
                },
            }
        });

        var friend_body = this.renderFriend();
        return(
            <div style={{"display":"inline"}}>

                <button style={styles.transparentBtn} name="navi_view_friend_list" onClick={this.onClick} className="btn btn-default">
                    <i className="glyphicon glyphicon-sunglasses"> FRIENDS</i>
                </button>

                <Modal isOpen={this.state.show}
                       onRequestHide={this.close}>

                    <ModalHeader>
                        <ModalClose onClick={this.close}/>
                        <ModalTitle>Friend List</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        {friend_body}
                    </ModalBody>

                    <ModalFooter>
                        <button name='confirm' className='btn btn-primary' onClick={this.confirm}>
                            Confirm
                        </button>
                    </ModalFooter>
                </Modal>

            </div>

        );
    }
}

function mapStateToProps(state){
    return {
        user: state.auth.user,
        hash: state.auth.hash,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewFriendList);
