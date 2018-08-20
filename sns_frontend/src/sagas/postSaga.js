import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import { delay } from 'redux-saga';
import * as actions from '../actions'

export function *watchWallGetPosts(){
    while(true) {
        const data = yield take('GET_POSTS_WALL');
        yield call(getPostsWall, data);
    }
}

export function *watchGetPosts(){
  while(true) {
    const data = yield take('GET_POSTS');
    yield call(getPosts, data);
  }
}

export function* watchPost() {
  while ( true ) {
    const data = yield take('POST_TEXT');
    yield call(post, data);
  }
}

export function* watchPostWall() {
    while ( true ) {
        const data = yield take('POST_WALL_TEXT');
        yield call(postwall, data);
    }
}

// added
export function *getPostsWall(action){
    const hash = yield select(selectors.getHash);
    let wallUser = action.owner;
    try {
        const response = yield call(fetch, urls.posts_wall_url()+wallUser+"/",{
            method: 'GET',
          headers: {
            'Authorization': `Basic ${hash}`
          }
        });
        if(!response.ok){
            yield put(actions.getPostsFailed());
            yield put(actions.postWallList(null));
        }
        else {
            var posts = null;
            var dataReceivedFlag = false;
            response.json().then(function(data) {
                dataReceivedFlag = true;
                posts = data;
            });
            while(!dataReceivedFlag) {
                yield delay(1)
            }

            for (let i=0; i < posts.length; i++) {
              if(posts[i].image != null)
                posts[i].image = urls.host.slice(0, -1) + posts[i].image;
            }
            yield put(actions.getMyFriends());
            yield put(actions.postWallList(posts));
        }
    }
    catch(err){
        yield put(actions.getPostsFailed());
    }
}


export function *getPosts(action){
  const hash = action.hash;

  try {
    const response = yield call(fetch, urls.posts_url(),{
        method: 'GET',
        headers: {
            'Authorization': `Basic ${hash}`
        }
    });

    if(!response.ok){
      yield put(actions.getPostsFailed());
    }
    else {
      var posts = null;
      var dataReceivedFlag = false;
      response.json().then(function(data) {
        dataReceivedFlag = true;
        posts = data;
      });
      while(!dataReceivedFlag)
      {
        yield delay(1)
      }

      for (let i=0; i < posts.length; i++) {
        if(posts[i].image != null)
          posts[i].image = urls.host.slice(0, -1) + posts[i].image;
      }

      yield put(actions.postList(posts));
      yield put(actions.getMyFriends());
    }
  }
  catch(err){
    yield put(actions.getPostsFailed());
  }

}


export function* post(data) {
  let hash = yield select(selectors.getHash);
  let text = data.text;
  let photo = data.photo;
  let poll_data = data.poll_data;

  const formData = new FormData();
  formData.append('text', text);
  if(photo != null) {
    formData.append('image', photo);
  }
  if(poll_data !=null){
      formData.append('poll_data', poll_data)
  }

  try{
      const response = yield call(fetch, urls.posts_url(), {
          method: 'POST',
          headers: {
              'Authorization': `Basic ${hash}`
          },
          body: formData
      });
      if(response.ok){
          yield put(actions.getPosts(hash)); // re render like count by re-rendering post
      }
  }
  catch(err){}
}

export function* postwall(data) {
    let hash = yield select(selectors.getHash);
    let user = yield select(selectors.getUser);
    let text = data.text;
    let owner = data.owner;
    let photo = data.photo;
    let poll_data = data.poll_data;

    const formData = new FormData();
    formData.append('text', text);
    if(photo != null) {
      formData.append('image', photo);
    }
    if(poll_data !=null){
        formData.append('poll_data', poll_data)
    }

    try{
        const response = yield call(fetch, urls.posts_wall_url()+owner+"/", {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${hash}`
            },
            body: formData
        });
        if(response.ok){
            yield put(actions.getPosts(hash)); // re render like count by re-rendering post
            yield put(actions.getPostsWall(hash, owner));
        }
    }
    catch(err){}
}
