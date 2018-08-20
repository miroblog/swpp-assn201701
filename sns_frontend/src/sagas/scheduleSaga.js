import { cancel, take, put, call, fork, select, spawn } from 'redux-saga/effects';
import * as selectors from './selectors';
import * as urls from '../urls';
import { delay } from 'redux-saga';
import * as actions from '../actions'


export function *watchAddSchedule(){
  while(true) {
    const data = yield take('ADD_SCHEDULE');
    yield call(addSchedule, data);
  }
}

export function *watchAddShareSchedule() {
  while(true) {
    const data = yield take('ADD_SHARE_SCHEDULE');
    yield call(addShareSchedule, data);
  }
}

export function *watchGetSchedules(){
  while(true) {
    const data = yield take('GET_SCHEDULES');
    yield call(getSchedules, data);
  }
}

export function *watchGetShareSchedules() {
  while(true) {
    const data = yield take('GET_SHARE_SCHEDULES');
    yield call(getShareSchedules, data);
  }
}

export function *watchAcceptSchedule() {
  while(true) {
    const data = yield take('ACCEPT_SCHEDULE');
    yield call(acceptSchedule, data);
  }
}

export function *watchRejectSchedule() {
  while(true) {
    const data = yield take('REJECT_SCHEDULE');
    yield call(rejectSchedule, data);
  }
}

export function* addShareSchedule(data) {
  let hash = yield select(selectors.getHash);
  let start = data.start
  let end = data.end
  let content = data.content
  let friends = data.friends;

  let start_time = start.getTime()
  let end_time = end.getTime()

  let body_friends = '';
  for ( let i=0; i<friends.length; i++ ) {
    body_friends += '&user' + String(i+1) + '=' + friends[i];
  }
  
  //console.log( 'add schedule saga' );
  //console.log( body_friends );

  try{
    const response = yield call(fetch, urls.share_schedule_url(), {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${hash}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'start='+start_time+'&'+'end='+end_time+'&'+'title='+content + body_friends
    });
    if(!response.ok){
      yield put(actions.addScheduleFailed());
    }
    else {
      yield put(actions.getSchedules());
    }
  }
  catch(err){
    yield put(actions.addScheduleFailed());
  }
}


export function* addSchedule(data) {
  let hash = yield select(selectors.getHash);
  let start = data.start
  let end = data.end
  let content = data.content
  //let friends = data.friends;

  let start_time = start.getTime()
  let end_time = end.getTime()

  //let body_friends = '';
  //for ( let i=0; i<friends.length; i++ ) {
    //body_friends += '&user' + String(i+1) + '=' + friends[i];
  //}
  
  //console.log( 'add schedule saga' );
  //console.log( body_friends );

  try{
    const response = yield call(fetch, urls.schedule_url(), {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${hash}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'start='+start_time+'&'+'end='+end_time+'&'+'title='+content
        //body: 'start='+start_time+'&'+'end='+end_time+'&'+'title='+content + body_friends
    });
    if(!response.ok){
      yield put(actions.addScheduleFailed());
    }
    else {
      yield put(actions.getSchedules());
    }
  }
  catch(err){
    yield put(actions.addScheduleFailed());
  }
}

export function* getSchedules(data) {
  let hash = yield select(selectors.getHash);

  console.log("catch getSchedules")
  try {
    const response = yield call(fetch, urls.schedule_url(),{
        method: 'GET',
        headers: {
            'Authorization': `Basic ${hash}`
        }
    });

    if(!response.ok){
      yield put(actions.getSchedulesFailed());
    }
    else {
      var schedules = null;
      var dataReceivedFlag = false;
      response.json().then(function(data) {
        dataReceivedFlag = true;
        schedules = data;
      });
      while(!dataReceivedFlag)
      {
        yield delay(1)
      }

      // parsing python datetime object to js Date object.
      for (let i=0; i<schedules.length; i++) {
        schedules[i].start = new Date(schedules[i].start)
        schedules[i].end = new Date(schedules[i].end)
      }
      console.log(schedules)

      yield put(actions.scheduleList(schedules));
    }
  }
  catch(err){
    yield put(actions.getSchdulesFailed());
  }
}

export function *getShareSchedules(data) {
  let hash = yield select(selectors.getHash);
  try {
    const response = yield call(fetch, urls.share_schedule_url(),{
      method: 'GET',
      headers: {
        'Authorization': `Basic ${hash}`
      }
    } )
    if ( !response.ok ) {
      console.log( 'get share schedules fail' );
    } else {
      let schedules_id = null;
      let dataReceivedFlag = false;
      response.json().then( function(data) {
        dataReceivedFlag = true;
        schedules_id = data;
      } );
      while ( !dataReceivedFlag ) {
        yield delay(1);
      }
      
      //console.log( 'get share schedules..' );
      //console.log( schedules_id );
      let schedules = [];
      for ( let i=0; i<schedules_id.length; i++ ) {
        try {
          let pk = schedules_id[i].schedule_id;
          const response2 = yield call(fetch, urls.schedule_detail_url(pk), {
            method: 'GET',
            headers: {
              'Authorization': `Basic ${hash}`
            }
          } )
          if ( !response2.ok ) {
            console.log( 'get detail schedule fail' );
          } else {
            let schedule = null;
            let flag = false;
            response2.json().then( function(data) {
              flag = true;
              schedule = data;
            } );
            while ( !flag ) {
              yield delay(1);
            }
            schedules.push( schedule );
          }
        } catch ( err ) {
          console.log( 'get detail schedule try fail' );
        }
      }

      //console.log(schedules);
      // parsing python datetime object to js Date object.
      for (let i=0; i<schedules.length; i++) {
        schedules[i].start = new Date(schedules[i].start)
        schedules[i].end = new Date(schedules[i].end)
      }

      yield put( actions.updateShareSchedules( schedules_id, schedules ) );

    }
  } catch ( err ) {
    console.log( 'get share schedules try fail' );
  }
}

export function *acceptSchedule(data) {
  //console.log( 'here is accept schedule' );
  let hash = yield select(selectors.getHash);
  let income_schedules = yield select(selectors.getShareSchedules_id);
  let schedule = data.schedule;

  let schedule_id = schedule.id;
  let request_id = null;
  for ( let i=0; i<income_schedules.length; i++ ) {
    if ( income_schedules[i].schedule_id == schedule_id ) {
      request_id = income_schedules[i].id;
      break;
    }
  }

  try {
    const response = yield call(fetch, urls.share_schedule_detail_url(request_id), {
        method: 'PUT',
        headers: {
            'Authorization': `Basic ${hash}`,
        }
    });
    if(!response.ok){
      console.log( 'response fail at accept schedule' );
    }
    else {
      yield put(actions.getSchedules());
      yield put(actions.getShareSchedules());
    }
   
  } catch ( err ) {
    console.log( 'accept schedule try fail' );
  }
  
}

export function *rejectSchedule(data) {
  let hash = yield select(selectors.getHash);
  let income_schedules = yield select(selectors.getShareSchedules_id);
  let schedule = data.schedule;

  let schedule_id = schedule.id;
  let request_id = null;
  for ( let i=0; i<income_schedules.length; i++ ) {
    if ( income_schedules[i].schedule_id == schedule_id ) {
      request_id = income_schedules[i].id;
      break;
    }
  }

  try {
    const response = yield call(fetch, urls.share_schedule_detail_url(request_id), {
        method: 'DELETE',
        headers: {
            'Authorization': `Basic ${hash}`,
        }
    });
    if(!response.ok){
      console.log( 'response fail at accept schedule' );
    }
    else {
      yield put(actions.getSchedules());
      yield put(actions.getShareSchedules());
    }
   
  } catch ( err ) {
    console.log( 'accept schedule try fail' );
  }

}
