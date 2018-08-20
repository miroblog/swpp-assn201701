import * as types from './ActionTypes';

// update vote
export function updateVote(payload) {
    return {
        type: types.UPDATE_VOTE,
        payload
    };
}

// general
export function serverDown() {
  return {
    type: types.SERVER_DOWN
  };
}


// sign up
export function checkUser(payload) {
  return {
    type: types.CHECK_USER,
    payload
  };
}

export function signupRequest(payload) {
  return {
    type: types.SIGNUP_REQUEST,
    payload
  };
}

export function signupOK() {
  return {
    type: types.SIGNUP_OK
  };
}

export function signupFailed() {
  return {
    type: types.SIGNUP_FAILED
  };
}

export function refresh() {
  return {
    type: types.REFRESH
  };
}

export function userExistsYes() {
  return {
    type: types.USER_EXISTS_YES
  };
}

export function userExistsNo() {
  return {
    type: types.USER_EXISTS_NO
  };
}

// login
export function loginRequest(payload) {
  return {
    type: types.LOGIN_REQUEST,
    payload
  };
}

export function authOK(hash, uname, userid) {
  return {
    type: types.AUTH_OK,
    hash,
    uname,
    userid
  };
}

export function authFailed(hash) {
  return {
    type: types.AUTH_FAILED,
    hash
  };
}

export function logout() {
  return {
    type: types.LOGOUT
  };
}

// posts
export function getPosts(hash) {
  return {
    type: types.GET_POSTS,
    hash
  };
}

// profile images
export function getProfileImages(){
    return {
        type : types.GET_PROFILE_IMAGES
    }
}

// get my friends
// posts
export function getMyFriends() {
    return {
        type: types.GET_MY_FRIENDS,
    };
}

export function imageList(images) {
    return {
        type: types.IMAGE_LIST,
        images
    };
}

// wall

export function getPostsWall(hash, owner) {
    return {
        type: types.GET_POSTS_WALL,
        hash, owner
    };
}

export function getPostsFailed() {
  return {
    type: types.GETPOSTS_FAILED
  };
}

export function postList(posts) {
  return {
    type: types.POST_LIST,
    posts
  };
}

export function postWallList(wallposts) {
    return {
        type: types.POST_WALL_LIST,
        wallposts
    };
}

export function friendRequestList(friend_requests) {
    return {
        type: types.FRIEND_REQEUSTS,
        friend_requests
    };
}


export function myfriendslist(my_friends) {
    return {
        type: types.MY_FRIENDS_LIST,
        my_friends
    };
}

export function postText(text, photo) {
  return {
    type: types.POST_TEXT,
    text,
    photo
  };
}

export function deletePost(postid) {
  return {
    type: types.DELETE_POST,
    postid
  };
}

export function revisePost(postid, text) {
  return {
    type: types.REVISE_POST,
    postid,
    text
  };
}

// comments
export function getComments(postid) {
  return {
    type: types.GET_COMMENTS,
    postid
  };
}

export function getCommentsFailed() {
  return {
    type: types.GETCOMMENTS_FAILED
  };
}

export function postComment(comment, postid) {
  return {
    type: types.POST_COMMENT,
    comment,
    postid
  };
}

export function commentList(comments, postid) {
  return {
    type: types.COMMENT_LIST,
    comments,
    postid
  };
}

// like
export function updateLike(payload) {
    return {
        type: types.UPDATE_LIKE,
        payload
    };
}
export function updateLikeComment(payload) {
    return {
        type: types.UPDATE_LIKE_COMMENT,
        payload
    };
}


export function postExistsNo() {
    return {
        type: types.POST_EXISTS_NO
    };
}

export function commentExistsNo() {
    return {
        type: types.COMMENT_EXISTS_NO
    };
}

// chat
export function getUsers(hash) {
  return {
    type: types.GET_USERS,
    hash
  };
}

export function getUsersFailed() {
  return {
    type: types.GETUSERS_FAILED
  };
}

export function userList(users) {
  return {
    type: types.USER_LIST,
    users
  }
}

export function chatStart(hash, user, partner) {
  return {
    type: types.CHAT_START,
    hash,
    user,
    partner
  }
}

export function getRoomsFailed() {
  return {
    type: types.GETROOMS_FAILED
  }
}

export function postRoomFailed() {
  return {
    type: types.POSTROOM_FAILED
  }
}

export function getMessages(hash, roomid) {
  return {
    type: types.GET_MESSAGES,
    hash,
    roomid
  }
}

export function getMessagesFailed() {
  return {
    type: types.GETMESSAGES_FAILED
  }
}

export function messageList(messages) {
  return {
    type: types.MESSAGE_LIST,
    messages
  }
}

export function postMessage(text, photo) {
  return {
    type: types.POST_MESSAGE,
    text,
    photo
  }
}

export function postMessageFailed() {
  return {
    type: types.POSTMESSAGE_FAILED
  }
}

export function setPartner(partner) {
  return {
    type: types.SET_PARTNER,
    partner
  }
}

// group chat
export function createGroup(users) {
  return {
    type: types.CREATE_GROUP,
    users
  }
}

export function createGroupFailed() {
  return {
    type: types.CREATEGROUP_FAILED
  }
}

export function getGroups() {
  return {
    type: types.GET_GROUPS
  }
}

export function getGroupsFailed() {
  return {
    type: types.GETGROUPS_FAILED
  }
}

export function groupList(groups) {
  return {
    type: types.GROUP_LIST,
    groups
  }
}

export function groupChatStart(group_id, users) {
  return {
    type: types.GROUPCHAT_STRAT,
    group_id,
    users
  }
}

export function setGroup(group_id, users) {
  return {
    type: types.SET_GROUP,
    group_id,
    users
  }
}

export function getGroupMessages() {
  return {
    type: types.GET_GROUP_MESSAGES
  }
}

export function groupMessageList(messages) {
  return {
    type: types.GROUP_MESSAGE_LIST,
    messages
  }
}

export function postGroupMessage(text, photo) {
  return {
    type: types.POST_GROUP_MESSAGE,
    text,
    photo
  }
}

export function stopGroupChatting() {
  return {
    type: types.STOP_GROUP_CHATTING
  }
}

export function addUserGroup(users) {
	return{
		type: types.ADD_USER_GROUP,
		users
	}
}
export function addUserGroupFailed() {
  return {
    type: types.ADDUSERGROUP_FAILED
  }
}

export function updateUsers(users) {
	return{
		type: types.UPDATE_USERS,
		users
	}
}
// settings
export function profileImageUpload(photo) {
  return {
    type: types.PROFILE_IMAGE_UPLOAD,
    photo
  }
}
export function profileImageUploadSuccess() {
  return {
    type: types.PROFILE_IMAGE_UPLOAD_SUCCESS,
  }
}
export function profileImageUploadFail() {
  return {
    type: types.PROFILE_IMAGE_UPLOAD_FAIL,
  }
}
export function emailChange(email) {
  return {
    type: types.EMAIL_CHANGE,
    email
  }
}
export function emailChangeSuccess() {
  return {
    type: types.EMAIL_CHANGE_SUCCESS
  }
}
export function emailChangeFail() {
  return {
    type: types.EMAIL_CHANGE_FAIL
  }
}
export function passwordChange(old_password, new_password) {
  return {
    type: types.PASSWORD_CHANGE,
    old_password,
    new_password
  }
}
export function passwordChangeSuccess() {
  return {
    type: types.PASSWORD_CHANGE_SUCCESS
  }
}
export function passwordChangeFail() {
  return {
    type: types.PASSWORD_CHANGE_FAIL
  }
}
export function nsfwDetected(probability) {
  return {
    type: types.NSFW_DETECTED,
    probability
  }
}
export function nsfwDetectedConfirm() {
  return {
    type: types.NSFW_DETECTED_CONFIRM
  }
}

export function gpsParse(location){
	return {
		type: types.GPS_PARSE,
		location
	}
}

export function searchFriends( searchValue ) {
  return {
    type: types.SEARCH_FRIENDS,
    searchValue
  }
}

export function showResult( users ) {
  return {
    type: types.SHOW_RESULT,
    users
  }
}

export function searchResultClose() {
  return {
    type: types.SEARCH_RESULT_CLOSE
  }
}

// schedule
export function addSchedule(start, end, content) {
  return {
    type: types.ADD_SCHEDULE,
    start,
    end,
    content
  }
}

export function addShareSchedule(start, end, content, friends) {
  return {
    type: types.ADD_SHARE_SCHEDULE,
    start,
    end,
    content,
    friends
  }
}

export function addScheduleFailed() {
  return {
    type: types.ADDSCHEDULE_FAILED
  }
}

export function getSchedules() {
  return {
    type: types.GET_SCHEDULES
  }
}

export function getShareSchedules() {
  return {
    type: types.GET_SHARE_SCHEDULES
  }
}

export function getSchedulesFailed() {
  return {
    type: types.GETSCHEDULES_FAILED
  }
}

export function scheduleList(schedules) {
  return {
    type: types.SCHEDULE_LIST,
    schedules
  }
}

export function selectFriends(users) {
  return {
    type: types.SELECT_FRIENDS,
    users
  }
}

export function updateShareSchedules( schedules_id, schedules ) {
  return {
    type: types.UPDATE_SHARE_SCHEDULES,
    schedules_id,
    schedules
  }
}

export function acceptSchedule(schedule) {
  return {
    type: types.ACCEPT_SCHEDULE,
    schedule
  };
}

export function rejectSchedule(schedule) {
  return {
    type: types.REJECT_SCHEDULE,
    schedule
  };
}
