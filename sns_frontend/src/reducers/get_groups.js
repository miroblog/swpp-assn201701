import * as types from '../actions/ActionTypes';

const initialState = {
    groups: []
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case "GROUP_LIST":
            var groups = action.groups;
			console.log(groups)
            return Object.assign({}, state, {groups});
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
        default:
            return state;
    }
}
