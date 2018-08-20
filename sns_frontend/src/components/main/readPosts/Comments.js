import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';
import {LikeComment} from '../LikePosts/emojis/examples/LikeComment';

class Comments extends Component {
	constructor(props){
		super(props);
		this.state = {
			show: false,
			comments: [],
			postid: this.props.postid,
			comment:""
		}
		//comment is user left comment, comments are lists of all comments
		this.onClick=this.onClick.bind(this);
		this.onSubmit=this.onSubmit.bind(this);
		this.onChange = this.onChange.bind(this);
		this.clearContents = this.clearContents.bind(this);
	}

	clearContents(element) {
    element.value = '';
  }

//onClick is to show or hide Comments(blue href button)
	onClick(e){
		e.preventDefault();
		if(this.state.show == false){
			this.setState({show:true});
			//sync comments on showing
			var postid = this.state.postid;
			this.props.dispatch({
				type: "GET_COMMENTS",
				postid
			});
			let hash = this.props.hash;
		let current=String(window.location);
		current = current.substr(current.lastIndexOf('/')+1);
		console.log(current);
		if(current == 'main_page'){
			this.props.dispatch({
				type: "GET_POSTS",
			hash});
			console.log(current)
		}
		else{
			let owner = current;
			this.props.dispatch({
				type: "GET_POSTS_WALL",
			hash, owner});
			console.log(current);

		}
		}
		else{
			this.setState({show:false});
		}
	}
	//this part is to render after state update is done
	//as there is a delay in getting response, there are two states of rendered components => this part makes the next-rendered-state-of-props to be saved in state
	componentWillReceiveProps(nextProps){
		if(this.state.postid == nextProps.newpostid){
			this.setState({comments: nextProps.comments});
		}
	}
	onChange(e){
		this.setState({ "comment": e.target.value});
		console.log(this.state.comment)
	}
	//this for Leave Comments part
	onSubmit(e){
		e.preventDefault();
		var comment = this.state.comment;
//comment validation needs to be checked(none-input)
		var postid = this.state.postid;
		console.log(comment)
		this.props.dispatch({
			type: "POST_COMMENT",
			postid,
			comment
		});
		this.props.dispatch({
			type: "GET_COMMENTS",
			postid
		});
		let hash =this.props.hash; 
		let current=String(window.location);
		current = current.substr(current.lastIndexOf('/')+1);
		console.log(current);
		if(current == 'main_page'){
			this.props.dispatch({
				type: "GET_POSTS",
			hash});
			console.log(current)
		}
		else{
			let owner = current;
			this.props.dispatch({
				type: "GET_POSTS_WALL",
			hash, owner});
			console.log(current);

		}
		var element = this.refs.text;
    this.clearContents(element);
	}
	comment(comment,index){
		var comment_id = this.state.postid + "_comment_" + index;
		var time = comment.time.substring(0,16)
		time = time.replace("T", " ");
		return(
			<div className="panel panel-default">
				<div className="panel-body">
					<pre style={
						{
							"display": "inline",
							"fontFamily":"Helvetica Neue",
							"fontSize":"14px",
							"lineHeight":"22px",
							"border":"0px",
							"marginLeft": "0px",
							"backgroundColor":"transparent",
							"padding": "0px",
						}} id={comment_id}><b>{comment.comment}</b></pre>
						<span className="badge pull-right">
						<strong>{comment.user}</strong><br/>{time}
						</span>
					<LikeComment dispatch={this.props.dispatch} post_id={this.state.postid} comment_id={comment.id} like_list={comment.like_list} uname = {this.props.user} />
				</div>
			</div>
			  );
	}
	renderComments(){
		var comments = [];
		var comment_id = this.state.postid + "_comment";
		var comment_btn = comment_id + "_btn";
		for(let i = 0; i < this.state.comments.length; i++){
			comments.push(this.comment(this.state.comments[i],i));
		}

		return (
				<div>
				{comments}
				<form onSubmit={this.onSubmit}>
				<div className="form-group">
					<textarea id={comment_id} ref="text" className="form-control" rows="1"
						onChange={this.onChange}/>
					<button id={comment_btn} className="btn btn-success btn-sm pull-right">
						Leave Comment</button>
				</div>
				</form>
			</div>
		   );
	}
	render(){
		var toggle_id = "comment_toggle_" + this.state.postid;
	    return (
			<div className="well" style={{"backgroundColor":"rgb(255,255,255)"}}>
				<a id={toggle_id} onClick={this.onClick} >Comments({this.props.count})</a>
				<div className={this.state.show?'show':'hide'}>
						{this.renderComments()}</div>
			</div>
	    );
	}
}
function mapStateToProps(state){
	return {
		newpostid: state.get_comments.newpostid,
		comments: state.get_comments.comments,
        user: state.auth.user,
        hash: state.auth.hash,
	}
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Comments);
