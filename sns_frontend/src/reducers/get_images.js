/**
 * Created by swpp on 24/05/17.
 */
import * as types from '../actions/ActionTypes';

const initialState = {
    images: [],
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
        case "IMAGE_LIST":
            var images = action.images;
            return Object.assign({}, state, {images});
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
        default:
            return state;
    }
}
