import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      photo: null,
      photo_input: false,
    };
	this.chatlater = this.chatlater.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearContents = this.clearContents.bind(this);
    this.onPhotoChange = this.onPhotoChange.bind(this);
  }

  message(message, key) {
	var textid = "text_"+key;
	var textuserid = textid+"_user";
  var time = message.time.substring(0,16);
  time = time.replace("T", " ");
  var me = message.user==this.props.user?true:false;
    return (
      <div style={{'paddingLeft': '20px', 'paddingRight': '20px'}}>
      <div className="media" style={me?{'text-align':'right'}:{'test-align':'left'}}>
        <text id={textid}>{message.text}</text>
        {message.image ? <div> <br/> <img className="img-thumbnail" src={message.image} style={{"padding": "0", "border": "0"}}/> <br/> </div>: null}
        <br/>
        <small id={textuserid}>{message.user}</small>
			  <small className="text-muted"> | {time}</small>
        <hr/>
      </div>
      </div>
    );
  }

  renderMessages() {
	if(this.props.valid != true){ return(<Redirect to = "/main_page"/>)}
	console.log(this.props.valid)
    var messages = [];
    for (let i=0; i<this.props.messages.length; i++){
      messages.push( this.message(this.props.messages[i], i) );
    }
    return (
      <div>
        <div className="pre-scrollable" style={{'height': '400px', 'max-height': '400px'}}>
          {messages}
          <div style={ {float:"left", clear: "both"} }
                    ref={(el) => { this.messagesEnd = el; }}></div>
        </div>
      </div>
    );
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({behavior: "smooth"});
  }

  componentDidMount() {
      this.scrollToBottom();
  }

  componentDidUpdate() {
      this.scrollToBottom();
  }

  clearContents(element) {
    element.value = null;
  }
  chatlater(e) {
	  e.preventDefault();
	  this.props.dispatch({
		type: "STOP_CHATTING",
		})
  }
  onSubmit(e) {
    e.preventDefault();
    var text = this.state.text;
    var photo = this.state.photo;

    this.props.dispatch( {
      type: "POST_MESSAGE",
      text,
      photo
    } )
    console.log(text);

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
    this.setState({ [e.target.id]: e.target.value });
    console.log(this.state.text);
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
    //console.log(photo);
  }

  onPhoto(e){
		var photo_input = !(this.state.photo_input) ;
		this.setState({
				photo_input:photo_input
		})
	}

  getPhotoInput() {
		var photoInput;
		if(this.state.photo_input == true){
				photoInput = (
					<input id="photo_input" ref="photo" className="fileInput" type="file" onChange={this.onPhotoChange} style={{"display": "inline", "marginLeft": "10px"}}/>
				)
		}
		else{
		}
		return photoInput;
	}

//Chat Later Button Added to Initialize state
  render() {
    const photo_input = this.getPhotoInput();
	  var placeholder = "Write a message to "+this.props.partner+"!"
    return (
          <div>
            <div>
              <div className="jumbotron" style={{"backgroundColor": "#eee"}}>
        				<h3>Chatting with {this.props.partner}...{this.props.valid}</h3>
        			  <div className="pull-right" style={{'text-align':'right'}}>
          				<button id='chatlater' className="btn btn-danger btn-sm" onClick={this.chatlater}>Chat Later!</button>
                </div>
              </div>
              {this.renderMessages()}
            </div>
            <div className="jumbotron" style={{"backgroundColor": "#eee"}}>
              <textarea id="text" ref="text" className="form-control send-message" rows="3" onChange={this.onChange} placeholder={placeholder}></textarea>
              <br/>
              <button type="button" className={(!this.state.photo_input)? "btn btn-default": "btn btn-default active"} onClick={this.onPhoto.bind(this)}>Photo</button>
              {photo_input}
              <div style={{"textAlign": "right"}}>
						    <button id="send" onClick={this.onSubmit} id="post_btn" className="btn btn-success btn-sm" >Send Message</button>
              </div>
            </div>
          </div>
    );
  }
}


function mapStateToProps(state) {
    return {
      partner: state.chat.partner,
	  roomid: state.chat.roomid,
	  user: state.auth.user,
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatForm);
