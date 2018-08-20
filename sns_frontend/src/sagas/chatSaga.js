import { cancel, take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import { delay } from 'redux-saga';
import * as actions from '../actions'

export function *watchGetUsers(){
  while(true) {
    const data = yield take('GET_USERS');
    yield call(getUsers, data);
  }
}

export function *watchChatStart() {
  while(true) {
    const data = yield take('CHAT_START');
    yield call(chatStart, data);
  }
}

export function *watchGetMessages() {
  while(true) {
    const data = yield take('GET_MESSAGES');
    yield call(getMessages, data);
  }
}

export function* watchPostMessage() {
  while ( true ) {
    const data = yield take('POST_MESSAGE');
    yield call(postMessage, data);
  }
}


export function *getUsers(action){
  console.log('users posts');
  const hash = action.hash;

  try {
    const response = yield call(fetch, urls.user_friend_list_url(),{
        method: 'GET',
        headers: {
            'Authorization': `Basic ${hash}`
        }
    });

    console.log('get response');
    console.log( response );
    if(!response.ok){
      yield put(actions.getUsersFailed());
    }
    else {
      var users = null;
      var dataReceivedFlag = false;
      response.json().then(function(data) {
        dataReceivedFlag = true;
        users = data;
      });
      while(!dataReceivedFlag)
      {
        yield delay(1)
      }

      console.log(users)
      yield put(actions.userList(users));
    }
  }
  catch(err){
    yield put(actions.getUsersFailed());
  }

}

export function *chatStart(action) {
  const hash = action.hash;
  let user = action.user;
  let partner = action.partner;

  try{
      const response = yield call(fetch, urls.chat_room_url(), {
          method: 'GET',
          headers: {
              'Authorization': `Basic ${hash}`
          }
      });

      if(!response.ok) {
        yield put(actions.getRoomsFailed());
      }
      else {
        var rooms = null;
        var dataReceivedFlag = false;
        response.json().then(function(data) {
          dataReceivedFlag = true;
          rooms = data;
        });
        while(!dataReceivedFlag)
        {
          yield delay(1)
        }

        console.log(rooms);

        // check if the room already exists.
        var roomExist = false;
        var room = null;
        for (let i=0; i<rooms.length; i++) {
          room = rooms[i];
          roomExist = (room.user1 == user && room.user2 == partner.username) || (room.user1 == partner.username && room.user2 == user);
          if (roomExist) {
            break;
          }
        }

        //when room already exists.
        if (roomExist) {
          var roomid = room.id;
          yield put(actions.setPartner(partner.username, roomid));
          yield put(actions.getMessages(hash, roomid));
        }
        else {
          try{
              const response = yield call(fetch, urls.chat_room_url(), {
                  method: 'POST',
                  headers: {
                      'Authorization': `Basic ${hash}`,
                      'Content-Type': 'application/x-www-form-urlencoded'
                  },
                  body: 'user2='+partner.username
              });
              if(response.ok){
				        yield spawn(chatStart, {hash, user, partner});
              }
              else {
                yield put(actions.postRoomFailed());
              }
          }
          catch(err){
            yield put(actions.postRoomFailed());
          }
        }
      }
  }
  catch(err){
    yield put(actions.getRoomsFailed());
  }
}

export function *getMessages(action) {
  const hash = action.hash;
  var roomid = action.roomid;
  //get the validity of chat room(if left) to initialize
  let ChatValid = yield select(selectors.getChatValid);
  let prev_messages = yield select(selectors.getChatMessages);

  try {
    const response = yield call(fetch, urls.messages_url(roomid),{
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

      console.log(messages)

      if(prev_messages.length < messages.length) {
        yield put(actions.messageList(messages));
      }

  	  /*originally this function permanently yield spawning even if
  		going backward or logout and login to another user(unexpected error)
  		Now, after getting the validity of the chat room from reducer,
  		it tries to get messages consistently only if valid */
  	  console.log(ChatValid)
  	  if(ChatValid){
  	      yield spawn(createNewGetMessages, {hash, roomid})
	  }
    }
  }
  catch(err){
    yield put(actions.getMessageFailed());
  }
}

export function* createNewGetMessages(data) {
  const hash = data.hash
  const roomid = data.roomid

  // every 0.5  sec...
  yield delay(500)
  console.log("0.5sec passed.")
  yield put(actions.getMessages(hash, roomid))
}


export function* postMessage(data) {
  let hash = yield select(selectors.getHash);
  let roomid = yield select(selectors.getRoomid);
  console.log(roomid)
  let text = data.text;
  let image = data.photo;
	console.log(data)

  const formData = new FormData();
  formData.append('text', text);
  formData.append('room', roomid);
  if(image != null) {
    formData.append('image', image);
  }

  try{
      const response = yield call(fetch, urls.messages_url(roomid), {
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
