export const local_host= "https://localhost:8443/";
export const remote_host = "https://34.208.93.214:8443/";
export const ho_host = "http://34.208.93.214:7000/";
export const ho_host2 = "http://52.25.7.185:7000/";

//export const host = ho_host;
export const host = local_host;
//export const host = remote_host;

export function friend_request_list_url() {
    let url = host+"friendrequest/";
    return url;
}
export function friend_request_detail_url(pk) {
    let url = host+"friendrequest/"+ pk + "/";
    return url;
}

export function myfriend_list_url() {
    let url = host+"myfriend/";
    return url;
}

export function vote_url(){
    let url = host+"vote/";
    return url;
}

export function myfriend_detail_url(pk) {
    let url = host+"myfriend/"+ pk + "/";
    return url;
}


export function checkuser_url() {
  let url = host+"users/exists/";
  return url;
}

// users -> signup
export function signup_url() {
  let url = host+"users/";
  return url;
}

export function user_detail_url( pk ) {
  let url = host + "users/" + pk + "/";
  return url;
}

export function user_email_detail_url(pk) {
  let url = host + "users/" + pk + "/email/";
  return url;
}

export function user_password_detail_url(pk) {
  let url = host + "users/" + pk + "/password/";
  return url;
}

export function login_url() {
  let url = host+"login/";
  return url;
}

// added wall post url

export function posts_wall_url() {
    let url = host+"wall/";
    return url;
}



export function posts_url() {
  let url = host+"posts/";
  return url;
}

export function post_detail_url( postid ) {
  let url = host + "posts/" + postid + "/";
  return url;
}

export function post_comments_url() {
  let url = host+"comments/";
  return url;
}
export function get_comments_url(postid) {
  let url = host+"posts/"+postid+"/comments/";
  return url;
}

export function like_url() {
    let url = host+"posts/like/";
    return url;
}

export function chat_room_url() {
  let url = host+"rooms/";
  return url;
}

export function groupchat_room_url() {
  let url = host+"rooms/group/";
  return url;
}

export function messages_url(roomid) {
  let url = host+"rooms/"+roomid+"/history/";
  return url;
}

export function group_messages_url(group_id) {
  let url = host+"rooms/group/"+group_id+"/history/";
  return url;
}

export function like_comment_url() {
    let url = host+"comments/like/";
    return url;
}

export function user_photo_url() {
  let url = host + "userphotos/";
  return url
}
export function geolocation_url(lat, lng){
	let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng="+ lat + "," + lng + "&key=AIzaSyAxgWTNb7KXBThU8-iOVTNvGFVOqdfxnJk";
	return url;
}

export function user_friend_list_url() {
  let url = host + "friends/";
  return url;
}

export function schedule_url() {
  let url = host + "schedule/";
  return url;
}

export function share_schedule_url() {
  let url = host + "shareschedule/";
  return url;
}

export function schedule_detail_url(pk) {
  let url = host + "schedule/" + pk + "/";
  return url;
}

export function share_schedule_detail_url(pk) {
  let url = host + "shareschedule/" + pk + "/";
  return url;
}
