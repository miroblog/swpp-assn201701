import * as types from '../actions/ActionTypes';

const initialState = {
  showResult: false,
  users: []
};

export default (state = initialState, action = {}) => {
	//console.log(action.type)
  switch(action.type) {
    case "SHOW_RESULT":
      let users = action.users;
      let showResult = true;
      return Object.assign({}, state, {showResult}, {users});
      
    case "SEARCH_RESULT_CLOSE":
      showResult = false;
      return Object.assign({}, state, {showResult});
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
    default:
      return state;
  }
}
