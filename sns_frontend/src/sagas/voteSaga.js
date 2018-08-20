import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import * as actions from '../actions'

export function *watchUpdateVote(){
    while(true) {
        const data = yield take('UPDATE_VOTE');
        yield call(updateVote, data);
    }
}

export function *updateVote(action){
    let hash = yield select(selectors.getHash);
    const {poll_id, option_id, owner} = action.payload;
    try{

        const response = yield call(fetch, urls.vote_url(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${hash}`
            },
            body: 'poll_id=' + poll_id + '&' + 'option_id=' + option_id
        });

        if(!response.ok){
            // not ok
            yield put(actions.serverDown());
        }
        else{
            yield put(actions.getPosts(hash)); // re render like count by re-rendering post
            if(owner != null){
                yield put(actions.getPostsWall(hash, owner));
            }
        }
    }
    catch(err){ // server has not responded
        yield put(actions.serverDown());
    }
}