import * as types from '../actions/ActionTypes';

const initialState = {
    schedules: [], // my schedule
  friends: [], // used to post schedule..
  shareSchedules: [], // suggested schedules
  shareSchedules_id: [] // suggested schedules meta data
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
      case "SELECT_FRIENDS":
        let friends = action.friends;
        return Object.assign({}, state, {friends});

        case "SCHEDULE_LIST":
            var schedules = action.schedules;
            return Object.assign({}, state, {schedules});
      case "UPDATE_SHARE_SCHEDULES":
        let shareSchedules = action.schedules;
        let shareSchedules_id = action.schedules_id;
        return Object.assign({}, state, {shareSchedules}, {shareSchedules_id});
      case "CLEAR_FRIENDS":
        friends = [];
        return Object.assign({}, state, {friends});
	case "LOGOUT":
	    var initstate = initialState;
    	    return Object.assign({}, initstate);
        default:
            return state;
    }
}
