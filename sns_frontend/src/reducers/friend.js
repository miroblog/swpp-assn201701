/**
 * Created by swpp on 30/05/17.
 */
import * as types from '../actions/ActionTypes';
import _ from 'lodash'
const initialState = {
    friend_requests: [],
    my_friends:[],
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case "FRIEND_REQEUSTS":
            var friend_requests = action.friend_requests;
            return Object.assign({}, state, {friend_requests});
        case "MY_FRIENDS_LIST":
            var my_friends = action.my_friends;
            return Object.assign({}, state, {my_friends});
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
        default:
            return state;
    }
}
