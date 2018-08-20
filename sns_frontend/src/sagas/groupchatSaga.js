import { cancel, take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import { delay } from 'redux-saga';
import * as actions from '../actions'

export function* watchAddUserGroup() {
  while(true) {
    const data = yield take('ADD_USER_GROUP');
    yield call(addUserGroup, data);
  }
}

export function *watchGetGroups(){
  while(true) {
    const data = yield take('GET_GROUPS');
    yield call(getGroups, data);
  }
}

export function *watchCreateGroup() {
  while(true) {
    const data = yield take('CREATE_GROUP');
    yield call(createGroup, data);
  }
}

export function *watchGroupChatStart() {
  while(true) {
    const data = yield take('GROUPCHAT_START');
    yield call(groupChatStart, data);
  }
}

export function *watchGetGroupMessages() {
  while(true) {
    const data = yield take('GET_GROUP_MESSAGES');
    yield call(getGroupMessages, data);
  }
}

export function* watchPostGroupMessage() {
  while ( true ) {
    const data = yield take('POST_GROUP_MESSAGE');
    yield call(postGroupMessage, data);
  }
}

export function *watchExitGroup() {
  while(true) {
    const data = yield take('EXIT_GROUP');
    yield call(exitGroup, data);
  }
}

export function *getGroups(action){
  let hash = yield select(selectors.getHash);

  try {
    const response = yield call(fetch, urls.groupchat_room_url(),{
        method: 'GET',
        headers: {
            'Authorization': `Basic ${hash}`
        }
    });

    console.log('get response');
    console.log( response );
    if(!response.ok){
      yield put(actions.getGroupsFailed());
    }
    else {
      var groups = null;
      var dataReceivedFlag = false;
      response.json().then(function(data) {
        dataReceivedFlag = true;
        groups = data;
      });
      while(!dataReceivedFlag)
      {
        yield delay(1)
      }

      console.log(groups)
      yield put(actions.groupList(groups));
    }
  }
  catch(err){
	  console.log("err");
    yield put(actions.getGroupsFailed());
  }
}


export function* createGroup(data) {
	console.log(data)
  let hash = yield select(selectors.getHash);
  let user = yield select(selectors.getUser);
  let otherUsers = data.users;

  let users = ''

  users = 'user1=' + user;
  for (let i=0; i<otherUsers.length; i++) {
    users = users + '&user' + String(i+2) + '=' + otherUsers[i];
  }

  console.log(users);

  try{
      const response = yield call(fetch, urls.groupchat_room_url(), {
          method: 'POST',
          headers: {
              'Authorization': `Basic ${hash}`,
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: users
      });
      if(!response.ok){
        yield put(actions.createGroupFailed());
      }
      else {
        console.log("create group success");
        yield put(actions.getGroups());
      }
  }
  catch(err){
    yield put(actions.createGroupFailed());
  }
}

export function* groupChatStart(action) {
  let hash = yield select(selectors.getHash);
  let group_id = action.group_id;
  let users = action.users;

  yield put(actions.setGroup(group_id, users));
  yield put(actions.getGroupMessages());
}


export function *getGroupMessages(action) {
  let hash = yield select(selectors.getHash);
  let group_id = yield select(selectors.getGroupid);
  //get the validity of chat room(if left) to initialize
  let ChatValid = yield select(selectors.getGroupChatValid);
  let prev_messages = yield select(selectors.getGroupChatMessages);
if(group_id==0) return;
  try {
    const response = yield call(fetch, urls.group_messages_url(group_id),{
        method: 'GET',
        headers: {
            'Authorization': `Basic ${hash}`
        }
    });

    console.log('get response');
    console.log( response );
    if(!response.ok){
      yield put(actions.getMessagesFailed());
    }
    else {
      var messages = null;
      var dataReceivedFlag = false;
      response.json().then(function(data) {
        dataReceivedFlag = true;
        messages = data;
      });
      while(!dataReceivedFlag)
      {
        yield delay(1)
      }

      if (prev_messages.length < messages.length) {
        yield put(actions.groupMessageList(messages));
      }

  	  /*originally this function permanently yield spawning even if
  		going backward or logout and login to another user(unexpected error)
  		Now, after getting the validity of the chat room from reducer,
  		it tries to get messages consistently only if valid */
  	  console.log(ChatValid)
  	  if(ChatValid){
  	      yield spawn(createNewGetGroupMessages, {})
  	  }
    }
  }
  catch(err){
    yield put(actions.getMessageFailed());
  }
}

export function* createNewGetGroupMessages(data) {
  // every 0.5  sec...
  yield delay(500)
  console.log("0.5sec passed.")
  yield put(actions.getGroupMessages())
}


export function* postGroupMessage(data) {
  let hash = yield select(selectors.getHash);
  let group_id = yield select(selectors.getGroupid);
  let text = data.text;
  let image = data.photo;
	console.log(data)

  const formData = new FormData();
  formData.append('text', text);
  formData.append('room', group_id);
  if(image != null) {
    formData.append('image', image);
  }


  try{
      const response = yield call(fetch, urls.group_messages_url(group_id), {
          method: 'POST',
          headers: {
              'Authorization': `Basic ${hash}`
          },
          body: formData
      });
      if(!response.ok){
          yield put(actions.postMessageFailed());
      }
      else {
        console.log("post message success");
      }
  }
  catch(err){
    yield put(actions.postMessageFailed());
  }
}
export function* addUserGroup(data) {
  let hash = yield select(selectors.getHash);
  let user = yield select(selectors.getUser);
  let group_id = yield select(selectors.getGroupid);
  let otherUsers = data.users;

  let users = ''
console.log(otherUsers)
  let room = 'roomid='+String(group_id);
  for (let i=0; i<otherUsers.length; i++) {
    users += '&user' + String(i+1) + '=' + otherUsers[i];
  }
  let body = room + users;
  try{
      const response = yield call(fetch, urls.groupchat_room_url(), {
          method: 'POST',
          headers: {
              'Authorization': `Basic ${hash}`,
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body
      });
      if(!response.ok){
        yield put(actions.addUserGroupFailed());
      }
      else {
	const response = yield call(fetch, urls.groupchat_room_url(),{
        method: 'GET',
        headers: {
            'Authorization': `Basic ${hash}`
        }
    });

    console.log('get response');
    console.log( response );
    if(!response.ok){
      yield put(actions.getGroupsFailed());
    }
    else {
      var groups = null;
      var dataReceivedFlag = false;
      response.json().then(function(data) {
        dataReceivedFlag = true;
        groups = data;
      });
      while(!dataReceivedFlag)
      {
        yield delay(1)
      }

      console.log(groups.length);
	  var userlist = [];
	  for(let i = 0 ; i < groups.length ; i++){
		  if(String(group_id) == String(groups[i].id)){
			  console.log(groups[i])
			  userlist = groups[i].user;
			  console.log(userlist);
			  break;
		  }
	  }
        console.log("add users to group success");
//        yield put(actions.updateUsers(otherUsers));
//  	      yield spawn(getGroups, {})
		  yield put(actions.setGroup(group_id, userlist));
      }
	  }
  }
  catch(err){
    yield put(actions.addUserGroupFailed());
  }
}
export function* exitGroup(data) {
  let hash = yield select(selectors.getHash);
  let user = yield select(selectors.getUser);
  let group_id = data.roomid;
  let body = 'delete=True&roomid='+String(group_id)
  try{
      const response = yield call(fetch, urls.groupchat_room_url(), {
          method: 'POST',
          headers: {
              'Authorization': `Basic ${hash}`,
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: body
      });
      if(!response.ok){
      //yield put(actions.exitGroupFailed());
      }
    else {
		console.log(response.status)
		//yield put(actions.exitGroupSuccess);
    }
  }
  catch(err){
	  console.log("err");
//    yield put(actions.exitGroupFailed());
  }
}
