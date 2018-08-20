/**
 * Created by swpp on 02/06/17.
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';
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

class ViewRequest extends Component {
    constructor(props){
        super(props);
        this.onClick = this.onClick.bind(this);
        this.close = this.close.bind(this);
        this.confirm = this.confirm.bind(this);
        this.state = { show: false,
            revise_text: this.props.content, finished_request_list:[],
        };
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

    onDecline(e){
        var id_list = this.state.finished_request_list;
        var pk = e.target.id;
        id_list.push(pk);
        var pk = e.target.id;
        this.props.dispatch({
            type: "DELETE_SENT_REQUEST",
            pk
        });
        this.setState({finished_request_list:id_list});
    }

    onAdd(e){
        var id_list = this.state.finished_request_list;
        var pk = e.target.id;
        id_list.push(pk);
        var pk = e.target.id;
        this.props.dispatch({
            type: "ACCEPT_FRIEND_REQUEST",
            pk
        });
        this.setState({finished_request_list:id_list});
    }

    contains(a, obj) {
        for(var prop in a){
            if(a[prop] ==obj){
                return true;
            }
        }
        return false;
    }

    renderList(object, isMyRequest){
        var name_display;
        if(isMyRequest){
            name_display = object.user_to;
        }else{
            name_display = object.user_from;
        }
        var id_list = this.state.finished_request_list;

        if(isMyRequest){
            if(this.contains(id_list, object.id)){
                return(
                    <li className="list-group-item"><del>{name_display}</del>
                        <span>
                <button className="btn btn-warning pull-right btn-sm disabled">Cancel</button>
            </span>
                    </li> );
            }
            else{
                return(
                    <li className="list-group-item">{name_display}
                        <span>
                <button name={"cancel_"+name_display} id={object.id} onClick={this.onDecline.bind(this)} className="btn btn-warning pull-right btn-sm">Cancel</button>
            </span>
                    </li> );
            }
        }
        else{
            if(this.contains(id_list, object.id)){
                return(
                    <li className="list-group-item"><del>{name_display}</del>
                        <span>
                <button className="btn btn-warning pull-right btn-sm disabled">Decline</button>
                <button className="btn btn-success pull-right btn-sm disabled">Accept</button>
            </span>
                    </li> );
            }
            else{
                return(
                    <li className="list-group-item"><span id={name_display} onClick={this.onwall.bind(this)}>{name_display}</span>
                        <span>
                <button name={"decline_"+name_display} id={object.id} onClick={this.onDecline.bind(this)} className="btn btn-warning pull-right btn-sm">Decline</button>
                <button name={"add_"+name_display} id={object.id} onClick={this.onAdd.bind(this)} className="btn btn-success pull-right btn-sm">Accept</button>
            </span>
                    </li> );
            }
        }


        /*
        return(
            <Toggle pk={pk} btn_value={true}/>);
            */
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

    renderRequest(){
        var other_request_list = [];
        var my_request_list = [];
        for(let i=0; i <this.props.my_request_list.length; i++){
            my_request_list.push(this.renderList(this.props.my_request_list[i], true));
        }
        for(let i=0; i < this.props.other_request_list.length; i++){
            other_request_list.push(this.renderList(this.props.other_request_list[i], false))
        }

        return(<div>
                <h1> Received Requests From </h1>
                <ul className="list-group">
                    {other_request_list}
                </ul>
                <h1> My Requests To </h1>
                <ul className="list-group">
                    {my_request_list}
                </ul>
        </div>
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
                    marginLeft:"2em",
                    marginRight:"1em",
                    color: 'white',
                    fontFamily: "Roboto",
                },
            }
        });

        var requestBody = this.renderRequest();
        return(
            <div style={{"display":"inline"}}>
                <button name="navi_view_requests"  onClick={this.onClick} className="btn btn-default" style={styles.transparentBtn}>
                    <i className="glyphicon glyphicon-send"> REQUESTS</i>
                </button>

                <Modal isOpen={this.state.show}
                       onRequestHide={this.close}>

                    <ModalHeader>
                        <ModalClose onClick={this.close}/>
                        <ModalTitle>Friend Requests</ModalTitle>
                    </ModalHeader>

                    <ModalBody>
                        {requestBody}
                    </ModalBody>

                    <ModalFooter>
                        <button id='confirm' className='btn btn-primary' onClick={this.confirm}>
                            OK
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

export default connect(mapStateToProps, mapDispatchToProps)(ViewRequest);
