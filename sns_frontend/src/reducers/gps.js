import * as types from '../actions/ActionTypes';

const initialState = {
	country : "",
	city : " Location",
	district : "",
	adress: "",
};

export default (state = initialState, action = {}) => {
  switch(action.type) {
      case "GPS_PARSE":
		  {
			  var location = action.location[0];
			  console.log(location);
			  var adress = location.formatted_adress;
			  var country = location.address_components[4].long_name;
			  var city = " " + location.address_components[3].long_name;
			  var district = " " + location.address_components[1].long_name;
			  return Object.assign({}, state, {city}, {district});
		  }
	  case "LOGOUT":
			var initstate = initialState;
			return Object.assign({}, initstate);
      default:
        return state;
  }
}
