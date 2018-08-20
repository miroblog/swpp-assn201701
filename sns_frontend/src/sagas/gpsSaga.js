import { take, put, call, fork, select, spawn } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import * as selectors from './selectors';
import * as urls from '../urls';
import * as actions from '../actions'
import api from '../services/api';

export function *watchLocation(){
	while(true) {
        const data = yield take('GET_LOCATION');
        yield call(geocoding, data);
  }
}


export function *geocoding(action){
	console.log(action)
	var latitude = action.latitude;
	var longitude = action.longitude;
	  try{
        const res = yield call(fetch, urls.geolocation_url(latitude, longitude),{
            method: 'GET',
        });
		console.log(res)
          var location = []; 
          var dataReceivedFlag = false;
          res.json().then(function(data) {
            dataReceivedFlag = true;
            location = data;
          })
          while(!dataReceivedFlag) {
            yield delay(1);
          }
          
		  yield put(actions.gpsParse(location.results));
	}
	catch(err){
	}
}
