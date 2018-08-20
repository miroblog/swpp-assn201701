import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import * as actions from '../actions'
import { delay } from 'redux-saga';

export function *watchProfileImageUpload(){
  while(true) {
    const data = yield take('PROFILE_IMAGE_UPLOAD');
    yield call(profileImageUpload, data);
  }
}

export function *watchEmailChange() {
  while( true ) {
    const data = yield take('EMAIL_CHANGE');
    yield call(emailChange, data);
  }
}

export function *watchPasswordChange() {
  while( true ) {
    const data = yield take('PASSWORD_CHANGE');
    yield call(passwordChange, data);
  }
}

export function *profileImageUpload(action){
  console.log('here is profileImageUpload');
  //console.log( action );
  let hash = yield select(selectors.getHash);
  const photo = action.photo;
  console.log(photo);

  const formData = new FormData(photo);
  formData.append('photo', photo);
  for ( var key of formData.entries() ) {
    //console.log(name);
    console.log(key[0]);
    console.log(key[1]);
  }
  //console.log(formData)

  console.log('start response')
  try{
    const response = yield call(fetch, urls.user_photo_url(),{
      method: 'POST',
      headers: {
        'Authorization': `Basic ${hash}`
            },
      body: formData
    });

  console.log( response );
  if ( !response.ok ) {

    if (response.status == '403') {
      var prob = null;
      var dataReceivedFlag = false;
      response.json().then(function(data) {
        dataReceivedFlag = true;
        prob = data;
      });
      while(!dataReceivedFlag)
      {
        yield delay(1)
      }
      console.log(prob)
      yield put( actions.nsfwDetected(prob.probability) );
    }
    else {
      // error handling
      console.log( 'profile image upload fail' );
      yield put( actions.profileImageUploadFail() );
    }

  } else {
    console.log( 'profile image upload success' );
    yield put( actions.profileImageUploadSuccess() );
    //yield put( actions.getPosts(hash) );
  }
  }
  catch(err){ // server has not responded
    yield put(actions.serverDown());
  }
}

export function *emailChange(action) {
  let hash = yield select(selectors.getHash);
  let userid = yield select(selectors.getUserid);
  const email = action.email;

  //console.log( userid );
  //console.log( email );
  try {
    const response = yield call(fetch, urls.user_email_detail_url(userid), {
        method: 'PUT',
            headers: {
                'Authorization': `Basic ${hash}`,
              'Content-Type': 'application/x-www-form-urlencoded'
            },
          body: 'email='+email
        });

    console.log( response );

    if ( !response.ok ) {
      console.log('email change fail');
      console.log('hash: ' + hash);
      console.log('userid: ' + userid);
      console.log('email: ' + email);
      yield put( actions.emailChangeFail() );
    } else {
      console.log('email change success');
      yield put( actions.emailChangeSuccess() );
    }
  } catch ( err ) {
    yield put(actions.serverDown());
  }
}

export function *passwordChange(action) {
  let hash = yield select(selectors.getHash);
  let userid = yield select(selectors.getUserid);
  const old_password = action.old_password;
  const new_password = action.new_password;

  try {
    const response = yield call(fetch, urls.user_password_detail_url(userid) , {
      method: 'PUT',
      headers: {
        'Authorization': `Basic ${hash}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: 'old_password='+old_password+'&new_password='+new_password
    })

    if ( !response.ok ) {
      //error control
      console.log('password change fail');
      yield put( actions.passwordChangeFail() );
    } else {
      console.log('password change success');
      yield put( actions.passwordChangeSuccess() );
    }
  } catch ( err ) {
    yield put(actions.serverDown());
  }
}
