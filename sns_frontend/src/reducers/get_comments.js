import * as types from '../actions/ActionTypes';

const initialState = {
    comments: [],
	newpostid: 0
};

export default
(state = initialState, action = {}) => {   switch(action.type) {
        case "COMMENT_LIST":
            var comments = action.comments;
			      var newpostid = action.postid;
			      console.log(newpostid+":newpostid");
            return Object.assign({}, state, {comments}, {newpostid});
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
        default:
            return state;
    }
}
