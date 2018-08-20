import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as selectors from './selectors';
import * as urls from '../urls';
import * as actions from '../actions'

export function *watchSearchFriends(){
    while(true) {
        const data = yield take('SEARCH_FRIENDS');
        yield call(searchFriends, data);
    }
}

export function *searchFriends(action){
  let hash = yield select(selectors.getHash);
  let key = action.searchValue;

  try {
    const response = yield call(fetch, urls.signup_url(), {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${hash}`,
      }
    });

    if ( !response.ok ) {
      console.log('get user fail at search friends');
    } else {
      let users = null;
      let dataReceived = false;
      response.json().then(function(data) {
        dataReceived = true;
        users = data;
      })
      while ( !dataReceived ) yield delay(1);
      
      let find_users = [];

      for ( let i=0; i<users.length; i++ ) {
        if ( users[i].username.includes(key) ) {
          find_users.push(users[i]);
        }
      }
      
      yield put( actions.showResult(find_users) )
    }
  } catch (e) {
    console.log( 'response system err at search friends' );
  }
   

    //let owner = action.owner;
    //const postid = action.postid;
    //const text = action.text;
    //try{
        //const response = yield call(fetch, urls.post_detail_url(postid),{
            //method: 'PUT',
            //headers: {
                //'Authorization': `Basic ${hash}`,
              //'Content-Type': 'application/x-www-form-urlencoded'
            //},
          //body: 'text='+text
        //});

      //if ( !response.ok ) {
        //// error handling
      //} else {
        //yield put( actions.getPosts(hash) );
        //yield put(actions.getPostsWall(hash, owner));
      //}
    //}
    //catch(err){ // server has not responded
        //yield put(actions.serverDown());
    //}
}
