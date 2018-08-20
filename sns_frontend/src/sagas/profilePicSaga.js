import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import { delay } from 'redux-saga';
import * as actions from '../actions'

export function *watchGetProfileImages(){
    while(true) {
        const data = yield take('GET_PROFILE_IMAGES');
        yield call(getProfileImages, data);
    }
}

export function *getProfileImages(action){
    let hash = yield select(selectors.getHash);

    try {
        const response = yield call(fetch, urls.user_photo_url(),{
            method: 'GET',
            headers: {
                'Authorization': `Basic ${hash}`
            }
        });

        if(!response.ok){
            yield put(actions.getPostsFailed());
        }
        else {
            var images = null;
            var dataReceivedFlag = false;
            response.json().then(function(data) {
                dataReceivedFlag = true;
                images = data;
            });
            while(!dataReceivedFlag)
            {
                yield delay(1)
            }

            var dict={};

            for(let i = 0 ; i < images.length ; i++){
                if(images[i].photo != null ){
                    dict[images[i].user] = images[i].photo;
                }
            }
            yield put(actions.imageList(dict));
        }
    }
    catch(err){
        yield put(actions.getPostsFailed());
    }
}
