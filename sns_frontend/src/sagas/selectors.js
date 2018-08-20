/**
 * Created by swpp on 17/04/17.
 */

// auth
export const getIsAuthenticated = (state) => state.auth.isAuthenticated;
export const getUser = (state) => state.auth.user;
export const getHash = (state) => state.auth.hash;
export const getUserid = (state) => state.auth.userid;

// signup
export const getSignup_redirect = (state) => state.signup.signup_redirect;
export const getUserexists = (state) => state.signup.userexists;

// chat
export const getRoomid = (state) => state.chat.roomid;
export const getChatValid = (state) => state.chat.valid;
export const getChatMessages = (state) => state.chat.messages;

// group chat
export const getGroupid = (state) => state.groupchat.group_id;
export const getGroupChatValid = (state) => state.groupchat.valid;
export const getGroupChatMessages = (state) => state.groupchat.messages;

//schedules
export const getShareSchedules = (state) => state.schedule.shareSchedules;
export const getShareSchedules_id = (state) => state.schedule.shareSchedules_id;
