import React, {Component} from 'react';
import {connect} from 'react-redux';

class ProfileIcon extends Component {
    constructor(props){
        super(props);
    }
    onClick(e){
        e.preventDefault();
    }

    render(){
        let imgSrc = this.props.images[this.props.user];
        if(this.props.images[this.props.user] == undefined){
            imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgXG63Ut_mXeASy1O1exvJTqHcmKkrhmTw9wpMzGxm-UKgNU5ZPzypw";
        }
        return (<div>
            <img className="img-circle" src={imgSrc} style={{ width: "60px", height:'60px'}}/>
        </div>);
    }
}
function mapStateToProps(state){
    return {
        images: state.get_images.images,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ProfileIcon);
