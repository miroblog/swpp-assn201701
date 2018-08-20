import React, {Component} from 'react';

import {connect} from 'react-redux';
import Comments from './Comments';
import LikePost from '../LikePosts/emojis/examples/LikePost';
import DeleteButton from '../deletePost/deleteButton';
import ReviseButton from '../revisePost/reviseButton';
import ProfileIcon from './ProfileIcon';
import ResultPoll from '../../poll/ResultPoll';
import VotePoll from '../../poll/VotePoll';

const defaultProps = {
};

class ReadPosts extends Component {
	constructor(props){
		super(props);
	}
  showAdminButtonsOrNot(postid, text, author, order) {
    if (this.props.user === author || this.props.user === 'sns_admin') {
      return (
        <div>
        <DeleteButton owner={this.props.owner} postid={postid} order={order}/>
        <ReviseButton owner={this.props.owner} postid={postid} content={text} order={order}/>
        </div>
      );
    }

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

  post(post, key, order) {
        // already voted?
      var votersList = [];
      var alreadyVoted = false;
      if(post.poll != null){
          votersList = post.poll.voters;
          for(let i= 0; i < votersList.length; i++){
              var voter = votersList[i];
              if(voter.username == this.props.user){
                  alreadyVoted = true;
                  break;
              }
          }
      }

	  var time = post.time.substring(0,16);
		time = time.replace("T", " ");
    return (
    <div id={"post_"+order} className="media well" style={{'width': '600px', 'backgroundColor': '#fff'}} key={key}>
      <div className="media" style={{'backgroundColor': '#fff'}}>
	      <div id={"post_"+order+"_text"} style={
						{
							"width": "auto",
							"outlineStyle":"dashed",
							"outlineWidth": "1px",
							"minHeight": "100px",
							"fontFamily":"Helvetica Neue",
							"fontSize":"15px",
							"lineHeight":"22px",
							"border":"0px",
							'backgroundColor': '#fff',
						}
					}><b style={{"wordBreak":"break-all"}}>{post.text}<br/></b>
				{post.image ? <div style={{"textAlign": "center"}}><br/><br/><img className="img-thumbnail" src={post.image} style={{"padding": "0", "border": "0"}}/></div>: null}
				{post.poll? (alreadyVoted)? <div><ResultPoll poll={post.poll}/></div>: <div><VotePoll post_id={"post_"+order} location={this.props.location} poll_id={post.poll.id} poll={post.poll}/></div> : null}
				<br/>
				</div>

          {this.showAdminButtonsOrNot( post.id, post.text, post.user, order )}
          <h5 className="media-heading pull-right">
              <strong id={"post_"+order+"_author"} style={{"fontSize":"20px"}} >
                  <ProfileIcon user={post.user}/>
                  <span id={post.user} onClick={this.onwall.bind(this)} name={post.user} >{post.user}</span>
              </strong>
              at {time}</h5>
				<LikePost post_id={post.id} like_list={post.like_list} uname = {this.props.user} />
	  	</div>
		  <Comments postid={post.id} count={post.comment_count}/>
    </div>
    );
  }

  renderPosts() {
    var posts = [];
    let post_order = 0;
    for ( let i=this.props.posts.length-1; i>=0; i--, post_order++ ) {
      posts.push( this.post(this.props.posts[i], i, post_order) );
    }
    return (
      <div>
      {posts}
      </div>
    );
  }

	render(){
		return(
      <div className="container" style={{'margin': 'auto', }}>
      {this.renderPosts()}
      </div>
		);
	}
}

function mapStateToProps(state){
	return {
        user: state.auth.user,
	}
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

ReadPosts.defaultProps = defaultProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReadPosts);
