import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import * as actions from '../actions'

export function *watchDeletePost(){
    while(true) {
        const data = yield take('DELETE_POST');
        yield call(deletePost, data);
    }
}

export function *deletePost(action){
    let hash = yield select(selectors.getHash);
    let owner = action.owner;
    const postid = action.postid;
    try{
        const response = yield call(fetch, urls.post_detail_url(postid),{
            method: 'DELETE',
            headers: {
                'Authorization': `Basic ${hash}`
            }
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
