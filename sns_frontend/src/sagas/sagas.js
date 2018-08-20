/**
 * Created by swpp on 17/04/17.
 */

import {take, put, call, fork, select, spawn} from 'redux-saga/effects'
import {watchSignUp, watchUserExist} from './signupSaga';
import {watchLogin} from './loginSaga';
import {watchGetPosts, watchPost, watchWallGetPosts, watchPostWall} from './postSaga';
import {watchComment, watchGetComments} from './commentSaga';
import {watchUpdateLikePost, watchUpdateLikeComment} from './likeSaga';
import {watchGetUsers, watchChatStart, watchGetMessages, watchPostMessage} from './chatSaga';
import {watchUpdateVote} from './voteSaga';
import {
    watchGetGroups,
    watchCreateGroup,
    watchGroupChatStart,
    watchGetGroupMessages,
    watchPostGroupMessage,
    watchAddUserGroup,
    watchExitGroup
} from './groupchatSaga';
import {watchDeletePost} from './deletePostSaga';
import {watchRevisePost} from './revisePostSaga';
import {watchProfileImageUpload, watchEmailChange, watchPasswordChange} from './settingsSaga';
import {watchGetProfileImages} from './profilePicSaga';
import {watchLocation} from './gpsSaga';
import {
    watchAcceptFriendRequest,
    watchAddFriendRequest,
    watchDeleteFriendRequest,
    watchDeleteSentRequest,
    watchGetFriendRequest,
    watchGetMyFriendsRequest
} from './friendRequestSaga';
import { watchSearchFriends } from './searchFriendsSaga';
import { watchAddSchedule, 
  watchGetSchedules,
  watchAddShareSchedule,
  watchGetShareSchedules,
  watchAcceptSchedule,
  watchRejectSchedule } from './scheduleSaga';

export default function* rootSaga() {
    yield fork(watchLogin);
    yield fork(watchSignUp);
    yield fork(watchUserExist);
    yield fork(watchPost);
    // profile pic
    yield fork(watchGetProfileImages);
    // wall
    yield fork(watchWallGetPosts);
    yield fork(watchPostWall);
    yield fork(watchGetPosts);
    yield fork(watchGetComments);
    yield fork(watchComment);
    yield fork(watchUpdateLikePost);
    yield fork(watchUpdateLikeComment);
    yield fork(watchGetUsers);
    yield fork(watchGetGroups);
    yield fork(watchCreateGroup);
    yield fork(watchChatStart);
    yield fork(watchGetMessages);
    yield fork(watchPostMessage);
    yield fork(watchDeletePost);
    yield fork(watchRevisePost);
    yield fork(watchGroupChatStart);
    yield fork(watchGetGroupMessages);
    yield fork(watchPostGroupMessage);
    yield fork(watchAddUserGroup);
    yield fork(watchExitGroup);
    // settings
    yield fork(watchProfileImageUpload);
    yield fork(watchEmailChange);
    yield fork(watchPasswordChange);
    yield fork(watchLocation);
    // friends
    yield fork(watchAcceptFriendRequest);
    yield fork(watchAddFriendRequest);
    yield fork(watchDeleteFriendRequest);
    yield fork(watchDeleteSentRequest);
    yield fork(watchGetFriendRequest);
    yield fork(watchGetMyFriendsRequest);
    // vote
    yield fork(watchUpdateVote);

  // search friends
  yield fork(watchSearchFriends);

    // schedule
    yield fork(watchAddSchedule);
    yield fork(watchGetSchedules);
  yield fork(watchAddShareSchedule);
  yield fork(watchGetShareSchedules);
  yield fork(watchAcceptSchedule);
  yield fork(watchRejectSchedule);
}
