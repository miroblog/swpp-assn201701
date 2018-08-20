import React from 'react';
import moment from 'moment';
import TextFieldGroup from '../common/TextFieldGroup'
import {connect} from 'react-redux';
import AddFriendsButton from './AddFriendsButton';
import reactCSS from 'reactcss';
/*import {
    BrowserRouter as Router,
    Route,
    Link, Switch, Redirect
} from 'react-router-dom';
import validateInput from '../validations/login';
import LoginSignup from './LoginSignup'; // logout routine
*/
class Schedule extends React.Component {
  constructor(props) {
    super(props);
    var now = new Date();
	var today = moment(new Date()).format("YYYY-MM-DD HH:mm");
    this.state = {
		edit: false,
		starttime:today,
		endtime:today,
		content:"",
		valid:false
    //friends: this.props.friends
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();
	if(!this.state.content)
		return alert("put your schedule");

	var edit = this.state.edit;
	 var start, end;
	if(!edit){
		start = new Date(this.props.start)
		end = new Date(this.props.end)
	}
	else{
		start=new Date(this.state.starttime);
		end = new Date(this.state.endtime);
	}
	if(isNaN(start.getTime())||isNaN(end.getTime()))
		return alert("put a valid date");
	var message = "Correct Schedule?"+
		"\nFrom : "+start.toLocaleString()+
		"\nTo        : "+end.toLocaleString()+"\n"+this.state.content;
	if(confirm(message)){
    if ( this.props.friends.length == 0 ) {
	    this.props.dispatch({
		    type: "ADD_SCHEDULE",
			start: start,
			end: end,
			content: this.state.content
        });
    } else {
      this.props.dispatch({
		    type: "ADD_SHARE_SCHEDULE",
			start: start,
			end: end,
			content: this.state.content,
      friends: this.props.friends
        });
      this.props.dispatch({
        type: "CLEAR_FRIENDS"
      })
    }
		this.props.dispatch({
			type: "GET_SCHEDULE",
			});
//		return window.location.reload();
	}
  }

  onContent(e) {
    this.setState({ [e.target.name]: e.target.value });
	console.log(this.state.content);
  }
  onChangeFrom(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  onChangeTo(e){
    this.setState({ [e.target.name]: e.target.value });
  }
  onEdit(e){
	  var edit = this.state.edit;
	  this.setState({starttime: this.props.start,
					endtime: this.props.end});
	  this.setState({edit: e.target.checked});
  }
  renderFriends() {
    console.log('here is renderFriends');
    console.log( this.props.friends );
    //console.log( this.state.friends );
    if ( this.props.friends.length == 0 )
      return (
        <span> There is no selected friends to be with </span>
      );

    let printed_friends = '';
    for ( let i=0; i<this.props.friends.length; i++ ) {
      if ( i==0 ) {
        printed_friends += this.props.friends[i];
        continue;
      }
      printed_friends += ', ' + this.props.friends[i];
    }
    return (
      <span> With: {printed_friends} </span>
    )
  }
  render() {
    const styles = reactCSS({
      'default': {
        container: {
         margin: 'auto',
         marginTop: '50px',
         backgroundColor: '#fff',
         width:'500px',
         paddingTop: '30px',
         paddingBottom: '30px',
         paddingRight: '30px',
         paddingLeft: '30px',
         border: '1px solid #e3e3e3',
         borderRadius: '4px',
       },
      }
    });

	  var start = this.props.start;
	  var end = this.props.end;
	  var from = new Date(this.props.start);
	  var to = new Date(this.props.end);
	  const {edit, starttime, endtime, content, valid} = this.state;
      return (
          <div style={styles.container} className="container">
                  <div className="form-group">
				   <h3>Drag Calendar for your Schedule!</h3>
					<div className="panel panel-success">
						<div className="panel-heading">
							<h4>Your Schedule to be added is...</h4>
						</div>
						<div className="panel-body">
							<div className="input-group">
								<span className="input-group-addon">
									From</span>
								<input id="starttime" type="text"
									className="form-control"
									name="starttime"
									value={edit?starttime:moment(start).format('YYYY-MM-DD HH:mm')}
									onChange={this.onChangeFrom.bind(this)}>
								</input>
								<span className="input-group-addon">
									To  </span>
								<input id="endtime" type="text"
									className="form-control" name="endtime"
									value={edit?endtime:moment(end).format('YYYY-MM-DD HH:mm')}
									onChange={this.onChangeTo.bind(this)}>
								</input>
							</div>
							<div className="container-fluid">
							<div className="pull-right">
								<input id="edit" type="checkbox" onChange={this.onEdit.bind(this)} name="edit" value=""></input>
								 click here for edit directly
							</div></div>
						<div className="container-fluid">
							<input id="content" type="text" onChange={this.onContent.bind(this)} value={content} name="content" width="100%" className="form-control" placeholder="I will add this to My Schedule..."></input>
						</div>
            <div className="container-fluid">
            <AddFriendsButton/>
            {this.renderFriends()}
            </div>
				  </div>
				  </div>
						<div className="pull-right">
						  <button id={'add_schedule'}
                      className="btn btn-success btn-lg"
                      onClick={this.onSubmit}>Add</button>

						</div>
					</div>

          </div>
    );
  }
}

function mapStateToProps(state) {
    return {
      friends: state.schedule.friends
    };
}

function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
