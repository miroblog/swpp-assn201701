import React, {Component} from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link, Switch, Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';
import reactCSS from 'reactcss';

import CreatePoll from '../../poll/CreatePoll'

class PostText extends Component {
	constructor(props){
		super(props);
    this.state = {
      text: '',
			photo: null,
			text_input:true,
			photo_input:false,
      editor_poll:false,
      location:false,
			where:"",
    };

    this.onChange = this.onChange.bind(this);
    this.onPost = this.onPost.bind(this);
	this.clearContents = this.clearContents.bind(this);
	this.onPhotoChange = this.onPhotoChange.bind(this);
	this.onPostPoll = this.onPostPoll.bind(this);
	}

	clearContents(element) {
    element.value = null;
  }
  onPostPoll(json_object){
      var poll_data = JSON.stringify(json_object);
      var text = this.state.text;
      var photo = this.state.photo;
      var owner = this.props.owner;
			if(this.state.location == true)
				text += " AT" + this.state.where;
      if(this.props.wall == true){
          this.props.dispatch( {
              type: "POST_WALL_TEXT",
              text, photo, owner, poll_data
          });
      } else{
          this.props.dispatch( {
              type: "POST_TEXT",
              text, photo, poll_data
          });
      }
      var text_element = this.refs.text;
			var photo_element = this.refs.photo;
			this.clearContents(text_element);
			this.clearContents(photo_element);
			this.setState({
				text: '',
				photo: null
			})
  }

  onPost(e) {
    e.preventDefault();
    var text = this.state.text;
    var photo = this.state.photo;
    var owner = this.props.owner;
	if(this.state.location == true)
		text += " AT" + this.state.where;
    if(this.props.wall == true){
        this.props.dispatch( {
            type: "POST_WALL_TEXT",
            text, photo, owner
        });
    } else{
        this.props.dispatch( {
            type: "POST_TEXT",
            text, photo
        });
    }

		var text_element = this.refs.text;
		var photo_element = this.refs.photo;
		this.clearContents(text_element);
		this.clearContents(photo_element);
		this.setState({
			text: '',
			photo: null
		})
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value })
  }

	onPhotoChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let photo = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        photo: photo
      })
    }

    reader.readAsDataURL(photo);
  }

	onText(e){
		var text_input = !(this.state.text_input) ;
		this.setState({
				text_input:text_input
		})
	}

	onPhoto(e){
		var photo_input = !(this.state.photo_input) ;
		this.setState({
				photo_input:photo_input
		})
	}

  onPoll(e){
    var editor_poll = !(this.state.editor_poll) ;
	  this.setState({
        editor_poll:editor_poll
    })
  }

	onLocation(e){
		var location = !(this.state.location) ;
		this.setState({
				location:location
		})
	  var location_text = (this.props.city + this.props.district);
	  this.setState({where: location_text});
  }

	getTextArea(){
		var textArea;
		if(this.state.text_input == true){
				textArea = (
					<div>
						<textarea
								id="text"
								ref="text"
								className="form-control" rows="5"
								onChange={this.onChange} />
						<br/>
					</div>
				)
		}
		else{
		}
		return textArea;
	}

  getEditor(){
      var editor;
      if(this.state.editor_poll == true){
          editor = (
              <CreatePoll onPostPoll={this.onPostPoll}/>
          )
      }
      else{
      }
      return editor;
  }

	getPhotoInput() {
		var photoInput;
		if(this.state.photo_input == true){
				photoInput = (
					<div>
						<input id="photo_input" ref="photo" className="file" type="file" onChange={this.onPhotoChange} />
						<br/>
					</div>
				)
		}
		else{
		}
		return photoInput;
	}

	getLocation() {
		var location;
		if(this.state.location == true){
			location = (
				<div>
					<h5><span className="glyphicon glyphicon-map-marker"></span>{this.state.where}</h5>
				</div>
			)
		}
		else {
		}
		return location;
	}

	render(){
		const styles = reactCSS({
			'default': {
				container: {
					margin: 'auto',
				},
				media_well: {
					marginTop: '50px',
					width: '600px',
					paddingTop: '30px',
					paddingLeft: '30px',
					paddingRight: '30px',
					paddingBottom: '20px',
					backgroundColor: '#fff'
				},
				post_btn: {
					textAlign: 'right',
				}
			}
		});

		const textarea = this.getTextArea();
    const editor = this.getEditor();
		const photo_input = this.getPhotoInput();
		const location = this.getLocation();

		return(
			<div className="container" style={styles.container}>
				<div className="media well" style={styles.media_well}>
        	<div>
						<label> Write your post! </label>
		 				<br/>
						<br/>

  						<div className="btn-group" role="group">
    						<button type="button" className={(!this.state.text_input)? "btn btn-default": "btn btn-default active"} onClick={this.onText.bind(this)}>Text</button>
								<button name="editor_poll" type="button" className={(!this.state.editor_poll)? "btn btn-default": "btn btn-default active"} onClick={this.onPoll.bind(this)}>Poll</button>
								<button type="button" className={(!this.state.photo_input)? "btn btn-default": "btn btn-default active"} onClick={this.onPhoto.bind(this)}>Photo</button>
								<button type="button" className={(!this.state.location)? "btn btn-default": "btn btn-default active"} onClick={this.onLocation.bind(this)}>Location</button>
  						</div>


						<span>
              {textarea}
            	{editor}
							{photo_input}
							{location}
          	</span>
					</div>
        	<div className="form-group" style={styles.post_btn}>
          <button onClick={this.onPost} id="post_btn" className="btn btn-success btn-sm"> Post </button>
        </div>
      </div>
		</div>
		);
	}
}
function mapStateToProps(state){
	return{
		city: state.gps.city,
		district : state.gps.district
	};
}
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PostText);
