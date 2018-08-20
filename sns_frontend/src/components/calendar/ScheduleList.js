import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Schedule from './Schedule';
import CalendarPage from './CalendarPage';
import reactCSS from 'reactcss';


class ScheduleList extends Component {
  constructor(props) {
    super(props);
  }
  onClick(){
	  return window.location.replace("/calendar");
  }
  eventParser(e, i){
	  var now = new Date();
	  return(
					<li className="list-group-item">
							<h4 id={"event_title_"+i}>{e.title}


							</h4>
							<h4>
		{(e.start<now)?
			<span className="label label-success pull-right">Ongoing</span>:
				(e.start<now.setDate(now.getDate()+1))?
				<span className="label label-warning pull-right">Imminent!</span>:
					(e.start<now.setDate(now.getDate()+6))?
					 <span className="label label-warning pull-right">In a week</span>:
					 ""}
         </h4>
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

	   for(let i = 0 ; i<schedules.length; i++){
		   var e = schedules[i];
		   if((e.start >= new Date())||((e.start < new Date())&&(e.end > new Date()))){
			   list.push(this.eventParser(e, i))
			   count++;
		   }
		   if(count>5 && this.props.page=='main'){
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
 				media_well: {
 					marginTop: '50px',
 					backgroundColor: '#fff',
          padding: '0',
          border: '0',
          maxWidth: '500px',
 				},
 			}
 		});
        return (
				<div>
          <div className="media well" style={styles.media_well}>
          <li className="list-group-item" style={{"backgroundColor": "#fff"}}><h4> My Schedules </h4></li>
  				{this.eventList()}
  				</div>
        </div>
			);
   }
}
function mapStateToProps(state){
	return{
    schedules: state.schedule.schedules
	};
}
function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(ScheduleList);
