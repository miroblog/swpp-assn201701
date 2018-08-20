import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as selectors from './selectors';
import * as urls from '../urls';
import * as actions from '../actions'
import api from '../services/api';

export function *watchLogin(){
	while(true) {
        const data = yield take('LOGIN_REQUEST');
        yield call(login, data);
  }
}


export function *login(action){
    const {uname, upwd}= action.payload;

    const hash = new Buffer(`${uname}:${upwd}`).toString('base64');
	  try{
        const response = yield call(fetch, urls.login_url(),{
            method: 'POST',
            headers: {
                'Authorization': `Basic ${hash}`
            }
        });

        if(!response.ok){
            yield put(actions.authFailed(hash));
        }
        else{ //login success
          const res = yield call(fetch, urls.signup_url(), {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${hash}`
            }
          })

          var userlist = null;
          var dataReceivedFlag = false;
          res.json().then(function(data) {
            dataReceivedFlag = true;
            userlist = data;
          })
          while(!dataReceivedFlag) {
            yield delay(1);
          }

          let userid = null;
          for ( let i=0; i<userlist.length; i++ ) {
            if ( userlist[i].username == uname ) {
              userid = userlist[i].id;
              break;
            }
          }

          //console.log( 'userid: ' + userid );
            yield put(actions.authOK(hash, uname, userid));
			      yield put(actions.getPosts(hash));
            yield put(actions.getProfileImages());
						yield put(actions.getSchedules());
        }
	}
	catch(err){
        yield put(actions.authFailed(hash));
	}
}

function userid(res) {
  console.log('here is userid');
  for ( let i=0; i<res.length ; i++ ) {
    console.log(res[i]);
  }

  return null;
}
