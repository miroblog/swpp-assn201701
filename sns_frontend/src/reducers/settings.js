import * as types from '../actions/ActionTypes';

const initialState = {
  photoUploadSuccessShow: false,
  photoUploadFailShow: false,
  EmailChangeSuccessShow: false,
  EmailChangeFailShow: false,
  PasswordChangeSuccessShow: false,
  PasswordChangeFailShow: false,
  nsfwPhotoDetected: false,
  nsfwProbability: 0,
};

export default (state = initialState, action = {}) => {
	//console.log(action.type)
  switch(action.type) {
    case "PROFILE_IMAGE_UPLOAD_SUCCESS":
      {
        //console.log('upload success reducer');
        let photoUploadSuccessShow = true;
        let photoUploadFailShow = false;
        return Object.assign({}, state, {photoUploadSuccessShow}, {photoUploadFailShow});
      }
    case "PROFILE_IMAGE_UPLOAD_FAIL":
      {
        let photoUploadSuccessShow = false;
        let photoUploadFailShow = true;
        return Object.assign({}, state, {photoUploadSuccessShow}, {photoUploadFailShow});
      }

    case "EMAIL_CHANGE_SUCCESS":
      {
        //console.log('upload success reducer');
        let EmailChangeSuccessShow = true;
        let EmailChangeFailShow = false;
        return Object.assign({}, state, {EmailChangeSuccessShow}, {EmailChangeFailShow});
      }
    case "EMAIL_CHANGE_FAIL":
      {
        let EmailChangeSuccessShow = false;
        let EmailChangeFailShow = true;
        return Object.assign({}, state, {EmailChangeSuccessShow}, {EmailChangeFailShow});
      }
    case "PASSWORD_CHANGE_SUCCESS":
      {
        //console.log('upload success reducer');
        let PasswordChangeSuccessShow = true;
        let PasswordChangeFailShow = false;
        return Object.assign({}, state, {PasswordChangeSuccessShow}, {PasswordChangeFailShow});
      }
    case "PASSWORD_CHANGE_FAIL":
      {
        let PasswordChangeSuccessShow = false;
        let PasswordChangeFailShow = true;
        return Object.assign({}, state, {PasswordChangeSuccessShow}, {PasswordChangeFailShow});
      }
    case "NSFW_DETECTED":
      {
        let nsfwPhotoDetected = true;
        let nsfwProbability = Math.floor(action.probability * 10000)/100;
        console.log(nsfwPhotoDetected)
        console.log(nsfwProbability)
        let photoUploadSuccessShow = false;
        let photoUploadFailShow = true;
        return Object.assign({}, state, {photoUploadSuccessShow}, {photoUploadFailShow}, {nsfwPhotoDetected}, {nsfwProbability});
      }
    case "NSFW_DETECTED_CONFIRM":
      {
        let nsfwPhotoDetected = false;
        return Object.assign({}, state, {nsfwPhotoDetected});
      }
	  case "LOGOUT":
		  {
			var initstate = initialState;
			return Object.assign({}, initstate);
		  }
    default:
      return state;
  }
}
