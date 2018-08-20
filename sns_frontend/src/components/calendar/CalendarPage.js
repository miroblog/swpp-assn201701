import React, { Component } from 'react';
import {connect} from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css'
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import Schedule from './Schedule';
import ScheduleList from './ScheduleList';
import ShareSchedules from './ShareSchedules';
import reactCSS from 'reactcss'
BigCalendar.momentLocalizer(moment);

class CalendarPage extends Component {
  constructor(props) {
    super(props);
	var date = new  Date();
	this.state={
		start : moment(date).format("YYYY-MM-DD HH:mm"),
		end : moment(date).format("YYYY-MM-DD HH:mm"),
	}
  }
  onSelectSlot(slotInfo){
	var start = moment(slotInfo.start).format("YYYY-MM-DD HH:mm");
	var end = moment(slotInfo.end).format("YYYY-MM-DD HH:mm");
	this.setState({start:start, end:end})
  }

   render() {
     const styles = reactCSS({
       'default': {
           /*
         backgroundCover: {
           backgroundColor: '#59744d',
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
         */
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
         calendar: {
 					margin: 'auto',
 					marginTop: '50px',
 					backgroundColor: '#fff',
          height:'560px',
          width:'660px',
          textAlign:'center',
          paddingTop: '30px',
          paddingBottom: '30px',
          paddingRight: '30px',
          paddingLeft: '30px',
          border: '1px solid #e3e3e3',
          borderRadius: '4px',
 				},
       }
     });
/*	   var myEvents = [{
		   'title':'test',
			   'start':new Date(),
			   'end':new Date(2017,12,31),
			   desc: 'for specific info'
	   }
	   ]*/
//	   var myEvents = this.props.schedules
        return (
          <div style={styles.backgroundCover}>
				<div className="container-fluid">
				<div className="row">
				<div className="col-lg-1"></div>
				<div style={styles.calendar} className="col-lg-4 container">
					<BigCalendar
						{...this.props}
						popup
						selectable
						events = {this.props.schedules}
						views={['month','week']}
						onSelectEvent={event =>alert(event.title)}
						onSelectSlot={this.onSelectSlot.bind(this)}
						timeslots={6}
					/> </div>
				<div className="col-lg-4 col-center">
					<div className="container-fluid">
					<Schedule start={this.state.start} end={this.state.end}/></div>
<div className="container">
          <ShareSchedules />
          <ScheduleList />
          </div>

				</div>
				</div>
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
export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);
