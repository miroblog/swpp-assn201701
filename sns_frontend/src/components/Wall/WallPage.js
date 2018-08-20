import React from 'react';
import {connect} from 'react-redux';
import PostText from '../main/postText/PostText';
import ReadPosts from '../main/readPosts/ReadPosts';
import reactCSS from 'reactcss';
import Style from 'style-it';

class WallPage extends React.Component {
    constructor(props){
        super(props);
        let hash = this.props.hash;
    }

    grid_layout(wallBody){
        let currentPath = this.props.location.pathname;
        let wallOwner = currentPath.split("/").pop();
        let imgSrc = this.props.images[wallOwner];
        if(this.props.images[wallOwner] == undefined){
            imgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwgXG63Ut_mXeASy1O1exvJTqHcmKkrhmTw9wpMzGxm-UKgNU5ZPzypw";
        }
        return(

                <div style={{'margin-top':'50px'}} className="container">
                    <div className="row">
                        <div className="col-sm-3 col-sm-offset-3 frame">
                            <img className="img-circle" src={imgSrc} style={{ width: '100%', maxHeight:'100%'}}/>
                        </div>
                        <div style={{'margin-top':'70px'}} className="container">
                            <h3 id="wall_title">{'Welcome to '+wallOwner +"'s wall"}</h3>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 col-sm-offset-3 frame">
                            {wallBody}
                        </div>
                    </div>
                </div>
        );
    }

    render(){
        const styles = reactCSS({
            'default': {
                /*backgroundCover: {
                    backgroundImage: `url(https://cdn.elegantthemes.com/blog/wp-content/uploads/2013/09/bg-10-full.jpg)`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundAttachment: 'fixed',
                    position: 'fixed',
                    overflowY: 'auto',
                    width: '100%',
                    height: '100%',
                    padding: '0',
                    margin: '0',
                    left: '0',
                },*/
                backgroundCover: {
        					//backgroundColor: 'rgba( 255, 255, 255, 0.3)',
        					backgroundColor: '#eee',
        					//backgroundColor: '#476a30',
        					backgroundSize: 'cover',
        					backgroundAttachment: 'fixed',
        					position: 'fixed',
        					overflowY: 'auto',
        					width: '100%',
        					height: '100%',
        					padding: '0',
        					margin: '0',
        					left: '0',
        				},
                'center':{
                    margin: '50px 0 20px',
        textAlign: 'center',
        padding:'0 10px',
                }
            }
        });
        let wallBody = this.getWallBody();
        return(
            <div style={styles.backgroundCover} >
                {this.grid_layout(wallBody)}
            </div>
        )
    }

  showInputBox(owner) {
    let friends = this.props.my_friends.friend_list;
    let isFriend = false;
    for ( let i=0; i<friends.length; i++ ) {
      console.log( friends[i].friend );
      if ( friends[i].friend == owner ) {
        isFriend = true;
      }
    }

    if ( this.props.user == owner ) {
      isFriend = true;
    }
    //console.log( friends[0].friend );
    if ( !isFriend ) {
      return ;
    }

    return (
      <div>
        <PostText wall={true} owner={owner} />
      </div>
    );
  }


    getWallBody() {
        let currentPath = this.props.location.pathname;
        let wallOwner = currentPath.split("/").pop();
        return (
            <div >
                <div>
          { this.showInputBox(wallOwner) }
                </div>
                <div>
                    <ReadPosts owner={wallOwner} location={this.props.location} posts={this.props.wallposts} history={this.props.history}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
        posts: state.get_posts.posts,
        wallposts: state.get_posts.wallposts,
        hash: state.auth.hash,
        chatstate: state.chat.valid,
        images: state.get_images.images,
      my_friends: state.friend.my_friends
    };
}

function mapDispatchToProps(dispatch){
    return{
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WallPage)
