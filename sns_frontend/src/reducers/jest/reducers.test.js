import rootReducer from '../../rootReducer';
import auth from '../auth'
import get_comments from '../get_comments'
import chat from '../chat'
import get_posts from '../get_posts'
import groupchat from '../groupchat'
import signup from '../signup'
import get_groups from '../get_groups'
import get_images from '../get_images'
import get_users from '../get_users'
import settings from '../settings';
import friend from '../friend';

describe('Testing Friend reducer', () =>{
		it('FRIEND_REQEUSTS', () => {
				let state = {friend_requests: []}
				state = friend(state, {
					type:"FRIEND_REQEUSTS",
					friend_requests: [1,2]
					 })
				expect(state).toEqual({
					friend_requests: [1,2]
							})
				} );
		it('MY_FRIENDS_LIST', () => {
				let state = {my_friends: []}
				state = friend(state, {
					type:"MY_FRIENDS_LIST",
					my_friends: [1,2]
					 })
				expect(state).toEqual({
					my_friends: [1,2]
							})
				} );
		it('LOGOUT', () => {
				let state = {	}
				state = friend(state, {
					type:"LOGOUT",
					})
				expect(state).toEqual({
my_friends:[], friend_requests:[]
				} );
	})
})

describe('Testing Auth reducer', () =>{
		it('AUTH_OK', () => {
				let state = { isAuthenticated: false,
							user: null,
							hash: false,
							userid: null }
				state = auth(state, {
					type:"AUTH_OK", isAuthenticated: true,
									hash: 0,
									userid: 0,
									uname: 'username'})
				expect(state).toEqual({
									isAuthenticated: true,
									hash: 0,
									userid: 0,
									user: 'username'})
				} );
		it('AUTH_FAILED', () => {
				let state = { isAuthenticated: false,
							hash: false}
				state = auth(state, {
					type:"AUTH_FAILED", isAuthenticated: true,
									hash: 0 })
				expect(state).toEqual({
									isAuthenticated: false,
									hash: 0})
				} );
		it('LOGOUT', () => {
				let state = { isAuthenticated: true,
							hash: 1,
							user: 'something',
							userid:1}
				state = auth(state, {
					type:"LOGOUT", isAuthenticated: false,
									hash: false })
				expect(state).toEqual({
									isAuthenticated: false,
									hash: false,
									user: null,
									userid: null
									})
				} );
});
describe('Testing get_comments Reducer', () =>{
		it('COMMENT_LIST', () => {
				let state = { comments: [],
							 newpostid: 0 }
				state = get_comments(state, {
					type:"COMMENT_LIST",
					postid: 1,
					comments: ['1','2'] })
				expect(state).toEqual({
									comments: ['1','2'],
									newpostid: 1
									})
				} );
		it('LOGOUT', () => {
				let state = {	}
				state = get_comments(state, {
					type:"LOGOUT",
					})
				expect(state).toEqual({
comments:[], newpostid:0
				} );
})
})

describe('Testing chat Reducer', () =>{
		it('CHAT_START', () => {
				let state = {valid: false, messages: []}
				state = chat(state, {
					type:"CHAT_START",
					valid: true,
					messages: [] })
				expect(state).toEqual({
							valid: true,
							messages:[]
							})
				} );

		it('SET_PARTNER', () => {
				let state = {partner:"", valid: false, roomid: 0}
				state = chat(state, {
					type:"SET_PARTNER",
					partner:"new",
					valid: true,
					roomid: 1 })
				expect(state).toEqual({
							partner: "new",
							valid: true,
							roomid: 1
							})
				} );
		it('MESSAGE_LIST', () => {
				let state = {messages: []
				}
				state = chat(state, {
					type:"MESSAGE_LIST",
					messages: ['a','b']
					})
				expect(state).toEqual({
					messages: ['a','b']
							})
				} );
		it('GET_MESSAGES', () => {
				let state = {roomid: 0
				}
				state = chat(state, {
					type:"GET_MESSAGES",
					roomid : 1
					})
				expect(state).toEqual({
					roomid:1
							})
				} );
		it('STOP_CHATTING', () => {
				let state = {	}
				state = chat(state, {
					type:"STOP_CHATTING",
					})
				expect(state).toEqual({
					partner : '',
					messages: [],
					roomid: 0,
					valid: false
							})
				} );
		it('LOGOUT', () => {
				let state = {	}
				state = chat(state, {
					type:"LOGOUT",
					})
				expect(state).toEqual({
					partner : '',
					messages: [],
					roomid: 0,
					valid: false
							})
				} );
})

describe('Testing get_posts', () =>{
		it('POST_LIST', () => {
				let state = {posts: [4]}
				state = get_posts(state, {
					type:"POST_LIST",
					posts: [1,2]
					 })
				expect(state).toEqual({
					posts: [1,2]
							})
				} );
		it('POST_WALL_LIST', () => {
				let state = {wallposts: []}
				state = get_posts(state, {
					type:"POST_WALL_LIST",
					wallposts: [1,2]
					 })
				expect(state).toEqual({
					wallposts: [1,2]
							})
				} );
		it('LOGOUT', () => {
				let state = {	}
				state = get_posts(state, {
					type:"LOGOUT",
					})
				expect(state).toEqual({
posts:[], wallposts:[]
				} );
})
})
describe('Testing groupchat Reducer', () =>{
		it('SET_GROUP', () => {
				let state = { users: [],
								group_id: [],
								valid: []}
				state = groupchat(state, {
					type:"SET_GROUP",
					group_id : 1,
					valid : true,
					users : [{username: 'a'}]
					 })
				expect(state).toEqual({
							valid: true,
							group_id : 1,
							users: ['a']
							})
				} );
		it('GROUP_MESSAGE_LIST', () => {
				let state = { messages: [] }
				state = groupchat(state, {
					type:"GROUP_MESSAGE_LIST",
					messages: ['a','b']
					 })
				expect(state).toEqual({
							messages: ['a','b']
							})
				} );
		it('STOP_CHATTING', () => {
				let state = { }
				state = groupchat(state, {
					type:"STOP_CHATTING",
					 })
				expect(state).toEqual({
							messages: [],
							users: [],
							group_id: 0,
							valid: false
							})
				} );
		it('STOP_CHATTING', () => {
				let state = { }
				state = groupchat(state, {
					type:"STOP_CHATTING",
					 })
				expect(state).toEqual({
							messages: [],
							users: [],
							group_id: 0,
							valid: false
							})
				} );
		it('LOGOUT', () => {
				let state = { }
				state = groupchat(state, {
					type:"LOGOUT",
					 })
				expect(state).toEqual({
							messages: [],
							users: [],
							group_id: 0,
							valid: false
							})
				} );
		it('EXIT_GROUP', () => {
				let state = { }
				state = groupchat(state, {
					type:"EXIT_GROUP",
					 })
				expect(state).toEqual({
							messages: [],
							users: [],
							group_id: 0,
							valid: false
							})
				} );
		it('STOP_GROUP_CHATTING', () => {
				let state = { }
				state = groupchat(state, {
					type:"STOP_GROUP_CHATTING",
					 })
				expect(state).toEqual({
							messages: [],
							users: [],
							group_id: 0,
							valid: false
							})
				} );
})
describe('Testing signup reducer', () =>{
		it('SIGNUP_OK', () => {
				let state = {signup_redirect:false}
				state = signup(state, {
					type:"SIGNUP_OK",
					signup_redirect:true
					 })
				expect(state).toEqual({
					signup_redirect:true
							})
				} );
		it('REFRESH', () => {
				let state = {signup_redirect:true}
				state = signup(state, {
					type:"REFRESH",
					signup_redirect:false
					 })
				expect(state).toEqual({
					signup_redirect:false
							})
				} );
		it('USER_EXISTS_YES', () => {
				let state = {userexists:false}
				state = signup(state, {
					type:"USER_EXISTS_YES",
					userexists:true
					 })
				expect(state).toEqual({
					userexists:true
							})
				} );
		it('USER_EXISTS_NO', () => {
				let state = {userexists:null}
				state = signup(state, {
					type:"USER_EXISTS_NO",
					userexists:false
					 })
				expect(state).toEqual({
					userexists:false
							})
				} );
		it('LOGOUT', () => {
				let state = {	}
				state = signup(state, {
					type:"LOGOUT",
					})
				expect(state).toEqual({
userexists:false,
signup_redirect:false,
				} );
	})
})
describe('Testing get_groups reducer', () =>{
		it('GROUP_LIST', () => {
				let state = {groups:[]}
				state = get_groups(state, {
					type:"GROUP_LIST",
					groups:[1,2]
					 })
				expect(state).toEqual({
					groups:[1,2]
							})
				} );
		it('LOGOUT', () => {
				let state = {	}
				state = get_groups(state, {
					type:"LOGOUT",
					})
				expect(state).toEqual({
groups:[]
				} );
	})
	})
describe('Testing get_images reducer', () =>{
		it('IMAGE_LIST', () => {
				let state = {images:[]}
				state = get_images(state, {
					type:"IMAGE_LIST",
					images:[1,2]
					 })
				expect(state).toEqual({
					images:[1,2]
							})
				} );
		it('LOGOUT', () => {
				let state = {images:[]}
				state = get_images(state, {
					type:"LOGOUT",
					 })
				expect(state).toEqual({
					images:[]
							})
				} );
	})
describe('Testing get_users reducer', () =>{
		it('USER_LIST', () => {
				let state = {users:[]}
				state = get_users(state, {
					type:"USER_LIST",
					users:[1,2]
					 })
				expect(state).toEqual({
					users:[1,2]
							})
				} );
		it('LOGOUT', () => {
				let state = {	}
				state = get_users(state, {
					type:"LOGOUT",
					})
				expect(state).toEqual({
users:[]
				} );
	})
	})
describe('Testing settings reducer', () => {
  it('PROFILE_IMAGE_UPLOAD_SUCCESS', () => {
    let state = { photoUploadSuccessShow: false,
                  photoUploadFailShow: false,
                  EmailChangeSuccessShow: false,
                  EmailChangeFailShow: false,
                  PasswordChangeSuccessShow: false,
                  PasswordChangeFailShow: false,
									nsfwPhotoDetected: false,
								  nsfwProbability: 0
								}
    state = settings( state, {
      type: "PROFILE_IMAGE_UPLOAD_SUCCESS",
      photoUploadSuccessShow: true,
      photoUploadFailShow: false
          } )
    expect(state).toEqual({
      photoUploadSuccessShow: true,
      photoUploadFailShow: false,
      EmailChangeSuccessShow: false,
      EmailChangeFailShow: false,
      PasswordChangeSuccessShow: false,
      PasswordChangeFailShow: false,
			nsfwPhotoDetected: false,
		  nsfwProbability: 0
    })
  });
  it('PROFILE_IMAGE_UPLOAD_FAIL', () => {
    let state = { photoUploadSuccessShow: false,
                  photoUploadFailShow: false,
                  EmailChangeSuccessShow: false,
                  EmailChangeFailShow: false,
                  PasswordChangeSuccessShow: false,
                  PasswordChangeFailShow: false,
									nsfwPhotoDetected: false,
								  nsfwProbability: 0
								 }
    state = settings( state, {
      type: "PROFILE_IMAGE_UPLOAD_FAIL",
      photoUploadSuccessShow: false,
      photoUploadFailShow: true
          } )
    expect(state).toEqual({
      photoUploadSuccessShow: false,
      photoUploadFailShow: true,
      EmailChangeSuccessShow: false,
      EmailChangeFailShow: false,
      PasswordChangeSuccessShow: false,
      PasswordChangeFailShow: false,
			nsfwPhotoDetected: false,
		  nsfwProbability: 0
    })
  });
  it('EMAIL_CHANGE_SUCCESS', () => {
    let state = { photoUploadSuccessShow: false,
                  photoUploadFailShow: false,
                  EmailChangeSuccessShow: false,
                  EmailChangeFailShow: false,
                  PasswordChangeSuccessShow: false,
                  PasswordChangeFailShow: false,
									nsfwPhotoDetected: false,
								  nsfwProbability: 0
								 }
    state = settings( state, {
      type: "EMAIL_CHANGE_SUCCESS",
      EmailChangeSuccessShow: true,
      EmailChangeFailShow: false
          } )
    expect(state).toEqual({
      photoUploadSuccessShow: false,
      photoUploadFailShow: false,
      EmailChangeSuccessShow: true,
      EmailChangeFailShow: false,
      PasswordChangeSuccessShow: false,
      PasswordChangeFailShow: false,
			nsfwPhotoDetected: false,
		  nsfwProbability: 0,
    })
  });
  it('EMAIL_CHANGE_FAIL', () => {
    let state = { photoUploadSuccessShow: false,
                  photoUploadFailShow: false,
                  EmailChangeSuccessShow: false,
                  EmailChangeFailShow: false,
                  PasswordChangeSuccessShow: false,
                  PasswordChangeFailShow: false,
									nsfwPhotoDetected: false,
								  nsfwProbability: 0
								 }
    state = settings( state, {
      type: "EMAIL_CHANGE_FAIL",
      EmailChangeSuccessShow: false,
      EmailChangeFailShow: true
          } )
    expect(state).toEqual({
      photoUploadSuccessShow: false,
      photoUploadFailShow: false,
      EmailChangeSuccessShow: false,
      EmailChangeFailShow: true,
      PasswordChangeSuccessShow: false,
      PasswordChangeFailShow: false,
			nsfwPhotoDetected: false,
		  nsfwProbability: 0
    })
  });
it('PASSWORD_CHANGE_SUCCESS', () => {
    let state = { photoUploadSuccessShow: false,
                  photoUploadFailShow: false,
                  EmailChangeSuccessShow: false,
                  EmailChangeFailShow: false,
                  PasswordChangeSuccessShow: false,
                  PasswordChangeFailShow: false,
									nsfwPhotoDetected: false,
								  nsfwProbability: 0
								 }
    state = settings( state, {
      type: "PASSWORD_CHANGE_SUCCESS",
      PasswordChangeSuccessShow: true,
      PasswordChangeFailShow: false
          } )
    expect(state).toEqual({
      photoUploadSuccessShow: false,
      photoUploadFailShow: false,
      EmailChangeSuccessShow: false,
      EmailChangeFailShow: false,
      PasswordChangeSuccessShow: true,
      PasswordChangeFailShow: false,
			nsfwPhotoDetected: false,
		  nsfwProbability: 0
    })
  });
it('PASSWORD_CHANGE_FAIL', () => {
    let state = { photoUploadSuccessShow: false,
                  photoUploadFailShow: false,
                  EmailChangeSuccessShow: false,
                  EmailChangeFailShow: false,
                  PasswordChangeSuccessShow: false,
                  PasswordChangeFailShow: false,
									nsfwPhotoDetected: false,
								  nsfwProbability: 0
								 }
    state = settings( state, {
      type: "PASSWORD_CHANGE_FAIL",
      PasswordChangeSuccessShow: false,
      PasswordChangeFailShow: true
          } )
    expect(state).toEqual({
      photoUploadSuccessShow: false,
      photoUploadFailShow: false,
      EmailChangeSuccessShow: false,
      EmailChangeFailShow: false,
      PasswordChangeSuccessShow: false,
      PasswordChangeFailShow: true,
			nsfwPhotoDetected: false,
		  nsfwProbability: 0
    })
  });
it('NSFW_DETECTED', () => {
	    let state = { photoUploadSuccessShow: false,
	                  photoUploadFailShow: false,
	                  EmailChangeSuccessShow: false,
	                  EmailChangeFailShow: false,
	                  PasswordChangeSuccessShow: false,
	                  PasswordChangeFailShow: false,
										nsfwPhotoDetected: false,
									  nsfwProbability: 0
									 }
	    state = settings( state, {
	      type: "NSFW_DETECTED",
				probability: 0.988,
				photoUploadSuccessShow: false,
        photoUploadFailShow: true,
				nsfwPhotoDetected: true,
	          } )
	    expect(state).toEqual({
	      photoUploadSuccessShow: false,
	      photoUploadFailShow: true,
	      EmailChangeSuccessShow: false,
	      EmailChangeFailShow: false,
	      PasswordChangeSuccessShow: false,
	      PasswordChangeFailShow: false,
				nsfwPhotoDetected: true,
			  nsfwProbability: 98.8
	    })
	 });
it('NSFW_DETECTED', () => {
	 	    let state = { photoUploadSuccessShow: false,
	 	                  photoUploadFailShow: false,
	 	                  EmailChangeSuccessShow: false,
	 	                  EmailChangeFailShow: false,
	 	                  PasswordChangeSuccessShow: false,
	 	                  PasswordChangeFailShow: false,
	 										nsfwPhotoDetected: false,
	 									  nsfwProbability: 0
	 									 }
	 	    state = settings( state, {
	 	      type: "NSFW_DETECTED_CONFIRM",
	 				nsfwPhotoDetected: false
	 	          } )
	 	    expect(state).toEqual({
	 	      photoUploadSuccessShow: false,
	 	      photoUploadFailShow: false,
	 	      EmailChangeSuccessShow: false,
	 	      EmailChangeFailShow: false,
	 	      PasswordChangeSuccessShow: false,
	 	      PasswordChangeFailShow: false,
	 				nsfwPhotoDetected: false,
	 			  nsfwProbability: 0
	 	    })
	 	 });
it('LOGOUT', () => {
	 	    let state = { photoUploadSuccessShow: false,
	 	                  photoUploadFailShow: false,
	 	                  EmailChangeSuccessShow: false,
	 	                  EmailChangeFailShow: false,
	 	                  PasswordChangeSuccessShow: false,
	 	                  PasswordChangeFailShow: false,
	 										nsfwPhotoDetected: false,
	 									  nsfwProbability: 0
	 									 }
	 	    state = settings( state, {
	 	      type: "LOGOUT",
	 	          } )
	 	    expect(state).toEqual({
	 	      photoUploadSuccessShow: false,
	 	      photoUploadFailShow: false,
	 	      EmailChangeSuccessShow: false,
	 	      EmailChangeFailShow: false,
	 	      PasswordChangeSuccessShow: false,
	 	      PasswordChangeFailShow: false,
	 				nsfwPhotoDetected: false,
	 			  nsfwProbability: 0
	 	    })
	 	 });
})
