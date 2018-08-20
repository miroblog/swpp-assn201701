import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import { delay } from 'redux-saga';
import * as actions from '../actions'


export function *watchGetComments(){
  while(true) {
    const data = yield take('GET_COMMENTS');
    yield call(getComments, data);
  }
}

export function* watchComment() {
  while ( true ) {
    const data = yield take('POST_COMMENT');
    yield call(post, data);
  }
}


export function *getComments(action){

  let hash = yield select(selectors.getHash);
	console.log('get comments');
	let postid = action.postid;

  try {
		const response = yield call(fetch, urls.get_comments_url(postid),{
			method: 'GET',
			headers: {
            'Authorization': `Basic ${hash}`
		   }
	    });

      if(!response.ok){
	      yield put(actions.getCommentsFailed());
	    }
	    else {
			  var comments = null;
		    var dataReceivedFlag = false;
			  response.json().then(function(data){
	         dataReceivedFlag = true;
		       comments = data;
	      });

        while(!dataReceivedFlag){
		       yield delay(1)
	      }

        yield put(actions.commentList(comments, postid));
//		yield put(actions.getPosts(hash));
		  }
	}
	catch(err){
		  yield put(actions.getCommentsFailed());
	}
}


function* post(data) {
  let hash = yield select(selectors.getHash);
  let comment = data.comment;
  let postid = data.postid;
  console.log(data)

  const response = yield call(fetch, urls.post_comments_url(), {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${hash}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
        body: 'post='+postid+'&'+'comment='+comment
  });
  console.log(response);
	yield put(actions.getComments(postid));
}
