import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Schedule from './Schedule';
import CalendarPage from './CalendarPage';
import reactCSS from 'reactcss';


class ShareSchedules extends Component {
  constructor(props) {
    super(props);
    this.onAccept = this.onAccept.bind(this);
    this.onReject = this.onReject.bind(this);
  }
  onClick(){
	  return window.location.replace("/calendar");
  }

  onAccept(e) {
    this.props.dispatch({
      type: "ACCEPT_SCHEDULE",
      schedule: e
    })
  }

  onReject(e) {
    this.props.dispatch({
      type: "REJECT_SCHEDULE",
      schedule: e
    })
  }

  eventParser(e, i){
	  var now = new Date();
	  return(
					<li className="list-group-item" style={{'max-width':'400px'}}>
							<h2 id={"suggest_title_"+i}>{e.title}
							</h2>
      <button id={'accept'+i}
              onClick={() => this.onAccept(e)}
              className="btn btn-success btn-sm"> accept </button>
      <button id={'reject'+i}
              onClick={() => this.onReject(e)}
              className="btn btn-warning btn-sm"> reject </button>
							<h3>
		{(e.start<now)?
			<span className="label label-primary pull-right">Ongoing</span>:
				(e.start<now.setDate(now.getDate()+1))?
				<span className="label label-danger pull-right">Imminent!</span>:
					(e.start<now.setDate(now.getDate()+6))?
					 <span className="label label-warning pull-right">In a week</span>:
					 ""}
							</h3>
							<p>{moment(e.start).format('YYYY-MM-DD HH:mm')}
							<br/>
							~ {moment(e.end).format('YYYY-MM-DD HH:mm')}
							</p>
						</li>
					)
  }
  eventList(){
    // this.props.dispatch({
		// type: "GET_SCHEDULES",
		// })
	var schedules = this.props.schedules;
    console.log('event list...');
    console.log( schedules );
	function compare(a,b){
		if(a.start<b.start) return -1;
		if(a.start>b.start) return 1;
		return 0;
	}
	schedules.sort(compare);
	  var list=[];
	   var count = 0;
//	   list.push(<ul className='list-group'></ul>);
	   if(schedules.length==0){
		  return (<div><h6> There is no schedule suggest.</h6></div>);
	   }
	   for(let i = 0 ; i<schedules.length; i++){
		   var e = schedules[i];
		   if((e.start >= new Date())||((e.start < new Date())&&(e.end > new Date()))){
			   list.push(this.eventParser(e, i))
			   count++;
		   }
		   if(count>2 && this.props.page=='main'){
			   list.push(
					<div style={{'text-align':'right'}}>
						{this.props.page=='main'?(
							<a id={"GoToCalendarBtn"} onClick={this.onClick}> + And more schedules... </a>):""}
				</div>
					   );
			   count=0;
			   break;
		   }
	   }
//	   list.push(</ul>);
	  return list;
  }
   render() {
     const styles = reactCSS({
       'default': {
         container: {
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

        return (
				<div style={styles.container}>
          <h4> Suggested Schedules from Friends </h4>
				{this.eventList()}
				</div>
			);
   }
}
function mapStateToProps(state){
	return{
    schedules: state.schedule.shareSchedules
	};
}
function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ShareSchedules);
