import * as types from '../actions/ActionTypes';

const initialState = {
  isAuthenticated: false,
  user: null,
  hash: false,
  userid: null
};

export default (state = initialState, action = {}) => {
	console.log(action.type)
  switch(action.type) {
      case "AUTH_OK":
		  {
			  let hash = action.hash;
			  let isAuthenticated = true;
			  let user = action.uname;
        let userid = action.userid;
			  return Object.assign({}, state, {hash}, {isAuthenticated}, {user}, {userid});
		  }
	  case "AUTH_FAILED":
		  {
			  let hash = action.hash;
			  return Object.assign({}, state, {hash});
		  }
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
      default:
        return state;
  }
}
