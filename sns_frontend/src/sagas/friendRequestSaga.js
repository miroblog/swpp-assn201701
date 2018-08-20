import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import { delay } from 'redux-saga';
import * as actions from '../actions'

export function *watchGetFriendRequest(){
    while(true) {
        const data = yield take('GET_FRIEND_REQUEST'); // friend requests list
        yield call(getFriendRequest, data);
    }
}

// added
export function *getFriendRequest(action){
    const hash = yield select(selectors.getHash);
    let wallUser = action.owner;
    try {
        const response = yield call(fetch, urls.friend_request_list_url(),{
            method: 'GET',
            headers: {
                'Authorization': `Basic ${hash}`
            }
        });
        if(!response.ok){
        }
        else {
            var friend_requests = null;
            var dataReceivedFlag = false;
            response.json().then(function(data) {
                dataReceivedFlag = true;
                friend_requests = data;
            });
            while(!dataReceivedFlag) {
                yield delay(1)
            }
            yield put(actions.friendRequestList(friend_requests));
        }
    }
    catch(err){
    }
}


export function *watchGetMyFriendsRequest(){
    while(true) {
        const data = yield take('GET_MY_FRIENDS');
        yield call(getMyFriends, data);
    }
}

// added
export function *getMyFriends(action){
    const hash = yield select(selectors.getHash);
    let wallUser = action.owner;
    try {
        const response = yield call(fetch, urls.myfriend_list_url(),{
            method: 'GET',
            headers: {
                'Authorization': `Basic ${hash}`
            }
        });
        if(!response.ok){
        }
        else {
            var my_friends = null;
            var dataReceivedFlag = false;
            response.json().then(function(data) {
                dataReceivedFlag = true;
                my_friends = data;

            });
            while(!dataReceivedFlag) {
                yield delay(1)
            }

            yield put(actions.myfriendslist(...my_friends));
        }
    }
    catch(err){
    }
}

// accept friend request saga
export function *watchAcceptFriendRequest(){
    while(true) {
        const data = yield take('ACCEPT_FRIEND_REQUEST');
        yield call(acceptFriend, data);
    }
}

// added
export function *acceptFriend(action){
    const hash = yield select(selectors.getHash);
    const pk = action.pk;
    let wallUser = action.owner;
    try {
        const response = yield call(fetch, urls.friend_request_detail_url(pk),{
            method: 'PATCH',
            headers: {
                'Authorization': `Basic ${hash}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'status='+1
        });

        // update friend&request status
        yield put({
            type: "GET_MY_FRIENDS"
        });
        yield put({
            type: "GET_FRIEND_REQUEST"
        });

        if(!response.ok){
        }
    }
    catch(err){
    }
}

export function *watchAddFriendRequest(){
    while(true) {
        const data = yield take('ADD_FRIEND_REQUEST');
        yield call(addFriend, data);
    }
}

// add to my friend request : lets be friends
export function *addFriend(action){
    const hash = yield select(selectors.getHash);
    const user = action.user;
    try {
        const response = yield call(fetch, urls.friend_request_list_url(),{
            method: 'POST',
            headers: {
                'Authorization': `Basic ${hash}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'user='+user+'&'+'status='+0,
        });
        // update friend&request status
        yield put({
            type: "GET_MY_FRIENDS"
        });
        yield put({
            type: "GET_FRIEND_REQUEST"
        });

        if(!response.ok){
        }
    }
    catch(err){
    }
}

// watch delete friend
export function *watchDeleteFriendRequest(){
    while(true) {
        const data = yield take('DELETE_FRIEND_REQUEST');
        yield call(deleteFriend, data);
    }
}

// delete friend
export function *deleteFriend(action){
    const hash = yield select(selectors.getHash);
    const user = action.user;
    const pk = action.pk;
    const from_navi_bar = action.from_navi_bar;

    let wallUser = action.owner;
    try {
        const response = yield call(fetch, urls.myfriend_detail_url(pk),{
            method: 'PATCH',
            headers: {
                'Authorization': `Basic ${hash}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'user='+user
        });
        // update friend&request status
        if(from_navi_bar){
            yield put({
                type: "GET_MY_FRIENDS"
            });
            yield put({
                type: "GET_FRIEND_REQUEST"
            });
        }

        if(!response.ok){
        }
    }
    catch(err){
    }
}

// watch cancel sent friend request
export function *watchDeleteSentRequest(){
    while(true) {
        const data = yield take('DELETE_SENT_REQUEST');
        yield call(deleteSentRequest, data);
    }
}

//  cancel sent friend request
export function *deleteSentRequest(action){
    const hash = yield select(selectors.getHash);
    const pk = action.pk;
    let wallUser = action.owner;
    const from_navi_bar = action.from_navi_bar;
    try {
        const response = yield call(fetch, urls.friend_request_detail_url(pk),{
            method: 'DELETE',
            headers: {
                'Authorization': `Basic ${hash}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        // update friend&request status
        if(from_navi_bar){
            yield put({
                type: "GET_MY_FRIENDS"
            });
            yield put({
                type: "GET_FRIEND_REQUEST"
            });
        }
        if(!response.ok){
        }
    }
    catch(err){
    }
}