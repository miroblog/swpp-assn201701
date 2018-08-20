import * as types from '../actions/ActionTypes';

const initialState = {
    posts: [],
    wallposts: [],
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case "POST_LIST":
            var posts = action.posts;
            console.log(posts);
            return Object.assign({}, state, {posts});
        case "POST_WALL_LIST":
            var wallposts = action.wallposts;
	    if(wallposts == undefined){
                wallposts = [];
            }
            return Object.assign({}, state, {wallposts});
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
        default:
            return state;
    }
}
