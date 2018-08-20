import React, { Component } from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {geolocated} from 'react-geolocated'

class GpsTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
		text : " Location",
		flag : false
    };
  }
  onlocation(){
	//Not supporting and Not enabled to be modal view
	  var text = !this.props.isGeolocationAvailable
			      ? 'Not supporting'
			      : !this.props.isGeolocationEnabled
					 ? 'Not enabled'
					: this.props.coords
	          ? 'Current location..'
          : 'Wating GPS';
	  this.setState({text: text});
	  if(text=='Current location..'){
		  var latitude = this.props.coords.latitude;
		  var longitude = this.props.coords.longitude;
		  this.setState({flag: true});
		  console.log(latitude+longitude)
		  this.props.dispatch({
            type: "GET_LOCATION",
			latitude,
			longitude
          });
	  }
	}
   render() {
	   var location_text = this.state.flag?(this.props.city+this.props.district):this.state.text;
	   //onClick
        return <li><a id="navi_location" onClick={this.onlocation.bind(this)} style={{"color": "#fff"}}><span className="glyphicon glyphicon-map-marker"></span>{location_text}</a></li>
  }
}

const combined = compose(
		geolocated({
		  positionOptions: {
			    enableHighAccuracy: false,
				  },
			  userDecisionTimeout: 5000
			}),
		connect(mapStateToProps, mapDispatchToProps)
		)

function mapStateToProps(state){
	return{
		city: state.gps.city,
		district : state.gps.district
	};
}
function mapDispatchToProps(dispatch){
    return {
        dispatch
    };
}
export default combined(GpsTest)
//export default connect(mapStateToProps, mapDispatchToProps)(GpsTest);
