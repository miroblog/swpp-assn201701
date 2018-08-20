import * as types from '../actions/ActionTypes';
//get_messages.js is renamed to chat.js in reducer
//since this has many actions other than just get_messages
const initialState = {
  users: [],
  messages: [],
	group_id: 0,
	valid: false,
};

export default (state = initialState, action = {}) => {    switch(action.type) {
      case "SET_GROUP":
		  console.log(action);
        var group_id = action.group_id;
  			var valid = true;
        var users = [];

        for (let i=0; i<action.users.length; i++) {
          users.push(action.users[i].username);
        }

        return Object.assign({}, state, {users}, {group_id}, {valid});
      case "GROUP_MESSAGE_LIST":
        var messages = action.messages;
        console.log(messages);
        return Object.assign({}, state, {messages});
  		case "STOP_GROUP_CHATTING":
	  case "STOP_CHATTING":
	  case "LOGOUT":
	  case "EXIT_GROUP":
			var initstate = initialState;
			return Object.assign({}, initstate);
      default:
        return state;
    }
}
