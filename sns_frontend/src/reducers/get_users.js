import * as types from '../actions/ActionTypes';

const initialState = {
    users: []
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case "USER_LIST":
            var users = action.users;
            return Object.assign({}, state, {users});
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
        default:
            return state;
    }
}
