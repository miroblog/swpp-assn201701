import * as types from '../actions/ActionTypes';
//get_messages.js is renamed to chat.js in reducer
//since this has many actions other than just get_messages
const initialState = {
    partner: '',
    messages: [],
	roomid: 0,
	valid: false,
};

export default (state = initialState, action = {}) => {
    switch(action.type) {
		case "CHAT_START":
			var valid = true;
			var messages = [];
			return Object.assign({}, state, {valid}, {messages});
        case "SET_PARTNER":
            var partner = action.partner;
			var roomid = action.roomid;
			var valid = true;
            return Object.assign({}, state, {partner}, {roomid}, {valid});
        case "MESSAGE_LIST":
            var messages = action.messages;
            return Object.assign({}, state, {messages});
		case "GET_MESSAGES":
			var roomid = action.roomid;
			return Object.assign({}, state, {roomid});
		case "STOP_CHATTING":
	    case "LOGOUT":
			var initstate = initialState;
			return Object.assign({}, initstate);
        default:
            return state;
    }
}
