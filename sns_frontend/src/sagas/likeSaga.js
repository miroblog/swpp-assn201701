import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import * as actions from '../actions'

export function *watchUpdateLikePost(){
    while(true) {
        const data = yield take('UPDATE_LIKE');
        yield call(updateLikePost, data);
    }
}

export function *updateLikePost(action){
    let hash = yield select(selectors.getHash);
    const {post_id,emoji, by} = action.payload;
    try{

        const response = yield call(fetch, urls.like_url(),{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${hash}`
            },
            body: 'id='+post_id+'&'+'emoji='+emoji+'&'+'by='+by
        });
        // user does not exist
        if(response.status == 404){
            yield put(actions.postExistsNo());
        }
        else if(response.status == 200){ //user exists
            yield put(actions.getPosts(hash)); // re render like count by re-rendering post
        }
    }
    catch(err){ // server has not responded
        yield put(actions.serverDown());
    }
}

export function *watchUpdateLikeComment(){
    while(true) {
        const data = yield take('UPDATE_LIKE_COMMENT');
        yield call(updateLikeComment, data);
    }
}

export function *updateLikeComment(action){
    let hash = yield select(selectors.getHash);
    const {post_id, comment_id,emoji, by} = action.payload;
    try{

        const response = yield call(fetch, urls.like_comment_url(),{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${hash}`
            },
            body: 'id='+comment_id+'&'+'emoji='+emoji+'&'+'by='+by
        });
        // user does not exist
        if(response.status == 404){
            yield put(actions.commentExistsNo());
        }
        else if(response.status == 200){ //user exists
            yield put(actions.getComments(post_id)); // re render like count by re-rendering post
        }
    }

    catch(err){ // server has not responded
        yield put(actions.serverDown());
    }
}