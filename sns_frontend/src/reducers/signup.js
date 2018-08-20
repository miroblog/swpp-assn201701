import * as types from '../actions/ActionTypes';

const initialState = {
    signup_redirect:false,
    userexists:false,
};

export default (state = initialState, action = {}) => {
    var signup_redirect;
    var userexists;
    switch(action.type) {
        case "SIGNUP_OK":
            // just update state, dom will re-render/route
            signup_redirect = true;
            return Object.assign({}, state, {signup_redirect});
        case "REFRESH":
            signup_redirect = false;
            return Object.assign({}, state, {signup_redirect});
        case "USER_EXISTS_YES":
            userexists = true;
            return Object.assign({}, state, {userexists});
        case "USER_EXISTS_NO":
            userexists = false;
            return Object.assign({}, state, {userexists});
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
        default:
            return state;
    }
}
