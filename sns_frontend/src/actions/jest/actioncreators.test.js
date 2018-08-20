import * as types from '../ActionTypes';
import * as actions from '../index';


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.SERVER_DOWN,
        }
        expect(actions.serverDown()).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        const payload = 'payload';
        const expectedAction = {
            type: types.CHECK_USER,
            payload
        }
        expect(actions.checkUser(payload)).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        const payload = 'payload';
        const expectedAction = {
            type: types.SIGNUP_REQUEST,
            payload
        };
        expect(actions.signupRequest(payload)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.SIGNUP_OK
        };
        expect(actions.signupOK()).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.SIGNUP_FAILED
        };
        expect(actions.signupFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.REFRESH
        };
        expect(actions.refresh()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.USER_EXISTS_YES
        };
        expect(actions.userExistsYes()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.USER_EXISTS_NO
        };
        expect(actions.userExistsNo()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const payload = 'payload';
        const hash = "hash";
        const uname ="uname";
        const userid = "userid";
        const expectedAction = {
            type: types.AUTH_OK,
            hash,
            uname,
            userid
        };
        expect(actions.authOK(hash, uname, userid)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const hash = 'hash';
        const expectedAction = {
            type: types.AUTH_FAILED,
            hash
        };
        expect(actions.authFailed(hash)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.LOGOUT
        };
        expect(actions.logout()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type : types.GET_PROFILE_IMAGES
        }
        expect(actions.getProfileImages()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const images = 'images';
        const expectedAction = {
            type: types.IMAGE_LIST,
            images
        };
        expect(actions.imageList(images)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const hash = 'hash';
        const owner = 'owner';
        const expectedAction = {
            type: types.GET_POSTS_WALL,
            hash, owner
        };
        expect(actions.getPostsWall(hash, owner)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.GETPOSTS_FAILED
        };
        expect(actions.getPostsFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const posts = 'posts';
        const expectedAction = {
            type: types.POST_LIST,
            posts
        };
        expect(actions.postList(posts)).toEqual(expectedAction)
    })
})

describe('actions', () => {
    it('should create an action to add a todo', () => {
        const wallposts = 'wallposts';
        const expectedAction = {
            type: types.POST_WALL_LIST,
            wallposts
        };
        expect(actions.postWallList(wallposts)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const wallposts = 'wallposts';
        const expectedAction = {
            type: types.POST_WALL_LIST,
            wallposts
        };
        expect(actions.postWallList(wallposts)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const text = 'text';
        const expectedAction = {
            type: types.POST_TEXT,
            text
        };
        expect(actions.postText(text)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const postid = 'postid';
        const expectedAction = {
            type: types.DELETE_POST,
            postid
        };
        expect(actions.deletePost(postid)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const text ='text' ;
        const postid = 'postid';
        const expectedAction = {
            type: types.REVISE_POST,
            postid, text
        };
        expect(actions.revisePost(postid, text)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const postid = 'postid';
        const expectedAction = {
            type: types.GET_COMMENTS,
            postid
        };
        expect(actions.getComments(postid)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.GETCOMMENTS_FAILED
        };
        expect(actions.getCommentsFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const comment = 'comment';
        const postid = 'postid';
        const expectedAction = {
            type: types.POST_COMMENT,
            comment,
            postid
        };
        expect(actions.postComment(comment, postid)).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        const comments = 'comments';
        const postid = 'postid';
        const expectedAction = {
            type: types.COMMENT_LIST,
            comments,
            postid
        };
        expect(actions.commentList(comments, postid)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const payload = 'payload';
        const expectedAction = {
            type: types.UPDATE_LIKE,
            payload
        };
        expect(actions.updateLike(payload)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const payload = 'payload';
        const expectedAction = {
            type: types.UPDATE_LIKE_COMMENT,
            payload
        };
        expect(actions.updateLikeComment(payload)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.COMMENT_EXISTS_NO
        };
        expect(actions.commentExistsNo()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const hash = 'hash';
        const expectedAction = {
            type: types.GET_USERS,
            hash
        };
        expect(actions.getUsers(hash)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.GETUSERS_FAILED
        };
        expect(actions.getUsersFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const users = 'users';
        const expectedAction = {
            type: types.USER_LIST,
            users
        }
        expect(actions.userList(users)).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        const hash = 'hash';
        const user = 'user';
        const partner = 'partner';
        const expectedAction = {
            type: types.CHAT_START,
            hash,
            user,
            partner
        }
        expect(actions.chatStart(hash, user, partner)).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.GETROOMS_FAILED
        }
        expect(actions.getRoomsFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.POSTROOM_FAILED
        }
        expect(actions.postRoomFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const hash = 'hash';
        const roomid = 'roomid';
        const expectedAction = {
            type: types.GET_MESSAGES,
            hash,
            roomid
        };
        expect(actions.getMessages(hash, roomid)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.GETMESSAGES_FAILED
        };
        expect(actions.getMessagesFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const messages = 'messages';
        const expectedAction = {
            type: types.MESSAGE_LIST,
            messages
        }
        expect(actions.messageList(messages)).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        const text = 'text';
        const expectedAction = {
            type: types.POST_MESSAGE,
            text
        }
        expect(actions.postMessage(text)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.POSTMESSAGE_FAILED
        }
        expect(actions.postMessageFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const partner = 'partner';
        const expectedAction = {
            type: types.SET_PARTNER,
            partner
        }
        expect(actions.setPartner(partner)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const users = 'users';
        const expectedAction = {
            type: types.CREATE_GROUP,
            users
        }
        expect(actions.createGroup(users)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.CREATEGROUP_FAILED
        }
        expect(actions.createGroupFailed()).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.GET_GROUPS
        }
        expect(actions.getGroups()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.GETGROUPS_FAILED
        }
        expect(actions.getGroupsFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const group_id = 'group_id';
        const users = 'users';
        const expectedAction = {
            type: types.GROUPCHAT_STRAT,
            group_id,
            users
        }
        expect(actions.groupChatStart(group_id, users)).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        const group_id = 'group_id';
        const users = 'users';
        const expectedAction = {
            type: types.SET_GROUP,
            group_id,
            users
        }
        expect(actions.setGroup(group_id, users)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.GET_GROUP_MESSAGES
        }
        expect(actions.getGroupMessages()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const messages = 'messages';
        const expectedAction = {
            type: types.GROUP_MESSAGE_LIST,
            messages
        }
        expect(actions.groupMessageList(messages)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const text = 'text';
        const expectedAction = {
            type: types.POST_GROUP_MESSAGE,
            text
        }
        expect(actions.postGroupMessage(text)).toEqual(expectedAction)
    })
})

describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.STOP_GROUP_CHATTING
        }
        expect(actions.stopGroupChatting()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const users = 'users';
        const expectedAction = {
            type: types.ADD_USER_GROUP,
            users
        }
        expect(actions.addUserGroup(users)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        //const payload = 'payload';
        const expectedAction = {
            type: types.ADDUSERGROUP_FAILED
        };
        expect(actions.addUserGroupFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const users = 'users';
        const expectedAction = {
            type: types.UPDATE_USERS,
            users
        }
        expect(actions.updateUsers(users)).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        const photo = 'photo';
        const expectedAction = {
            type: types.PROFILE_IMAGE_UPLOAD,
            photo
        }
        expect(actions.profileImageUpload(photo)).toEqual(expectedAction)
    })
})



describe('actions', () => {
    it('should create an action to add a todo', () => {
        const email = 'email';
        const expectedAction = {
            type: types.EMAIL_CHANGE,
            email
        }
        expect(actions.emailChange(email)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const schedules_id = ['id1', 'id2'];
        const schedules = ['sche1', 'sche2'];
        const expectedAction = {
            type: types.UPDATE_SHARE_SCHEDULES,
            schedules_id,
            schedules
        }
        expect(actions.updateShareSchedules(schedules_id, schedules)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
      const schedule = 'schedule';
        const expectedAction = {
            type: types.ACCEPT_SCHEDULE,
          schedule
        }
        expect(actions.acceptSchedule(schedule)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
      const schedule = 'schedule';
        const expectedAction = {
            type: types.REJECT_SCHEDULE,
          schedule
        }
        expect(actions.rejectSchedule(schedule)).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const expectedAction = {
            type: types.ADDSCHEDULE_FAILED
        }
        expect(actions.addScheduleFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
it('should create an action to add a todo', () => {
    const expectedAction = {
        type: types.GET_SCHEDULES
    }
    expect(actions.getSchedules()).toEqual(expectedAction)
})
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
        const expectedAction = {
            type: types.GETSCHEDULES_FAILED
        }
        expect(actions.getSchedulesFailed()).toEqual(expectedAction)
    })
})


describe('actions', () => {
    it('should create an action to add a todo', () => {
      const schedules = ['a', 'b'];
        const expectedAction = {
            type: types.SCHEDULE_LIST,
          schedules
        }
        expect(actions.scheduleList(schedules)).toEqual(expectedAction)
    })
})

describe('actions', () => {
    it('should create an action to add a todo', () => {
      const users = ['a', 'b'];
        const expectedAction = {
            type: types.SELECT_FRIENDS,
          users
        }
        expect(actions.selectFriends(users)).toEqual(expectedAction)
    })
})

describe('actions', () => {
    it('should create an action to add a todo', () => {
      const start = 'start';
      const end = 'end';
      const content = 'schedule content';
      const friends = ['f1', 'f2'];
        const expectedAction = {
            type: types.ADD_SHARE_SCHEDULE,
          start,
          end,
          content,
          friends
        }
        expect(actions.addShareSchedule(start, end, content, friends)).toEqual(expectedAction)
    })
})

describe('actions', () => {
    it('should create an action to add a todo', () => {
      const start = 'start';
      const end = 'end';
      const content = 'schedule content';
        const expectedAction = {
            type: types.ADD_SCHEDULE,
          start,
          end,
          content
        }
        expect(actions.addSchedule(start, end, content)).toEqual(expectedAction)
    })
})
