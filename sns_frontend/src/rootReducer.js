import { combineReducers } from 'redux';
import auth from './reducers/auth';
import signup from './reducers/signup';
import get_posts from './reducers/get_posts';
import get_comments from './reducers/get_comments';
import get_users from './reducers/get_users';
import get_groups from './reducers/get_groups';
import chat from './reducers/chat'
import groupchat from './reducers/groupchat';
import get_images from './reducers/get_images';
import settings from './reducers/settings';
import gps from './reducers/gps';
import friend from './reducers/friend'
import search from './reducers/search';
import schedule from './reducers/schedule';

export default combineReducers({
  auth, signup, get_posts, get_comments, get_users, get_groups, chat, groupchat, get_images, settings, gps, friend, search, schedule
});
