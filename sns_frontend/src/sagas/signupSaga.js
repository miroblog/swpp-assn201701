import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import * as actions from '../actions'


export function *watchUserExist(){
    while(true){
        const data = yield take('CHECK_USER');
        yield call(checkuser, data);
    }
}

export function *watchSignUp(){
	while(true){
		const data = yield take('SIGNUP_REQUEST');
		yield call(signup, data);
	}
}


export function *checkuser(action){
    const {uname} = action.payload;
    try{

        const response = yield call(fetch, urls.checkuser_url(),{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'username='+uname
        });
        // user does not exist
        if(response.status == 204){
            yield put(actions.userExistsNo());
        }
        else if(response.status == 200){ //user exists
            yield put(actions.userExistsYes());
        }
    }
    catch(err){ // server has not responded
        yield put(actions.serverDown());
    }
}

export function *signup(action){
	try{

        const {uname, upwd, email}= action.payload;
        const response = yield call(fetch, urls.signup_url(),{
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'username='+uname+'&'+'password='+upwd+'&'+'email='+email
        });
        if(!response.ok){
            yield put(actions.signupFailed());
        }
        else{
            yield put(actions.signupOK());
        }
	}
	catch(err){
        yield put(actions.signupFailed());
	}
}
