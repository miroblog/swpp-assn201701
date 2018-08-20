import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import * as actions from '../actions'

export function *watchRevisePost(){
    while(true) {
        const data = yield take('REVISE_POST');
        yield call(revisePost, data);
    }
}

export function *revisePost(action){
    let hash = yield select(selectors.getHash);
    let owner = yield select(selectors.getUser);
    const postid = action.postid;
    const text = action.text;
    try{
        const response = yield call(fetch, urls.post_detail_url(postid),{
            method: 'PUT',
            headers: {
                'Authorization': `Basic ${hash}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          body: 'text='+text
        });

      if ( !response.ok ) {
        // error handling
      } else {
        yield put( actions.getPosts(hash) );
        yield put(actions.getPostsWall(hash, owner));
      }
    }
    catch(err){ // server has not responded
        yield put(actions.serverDown());
    }
}
