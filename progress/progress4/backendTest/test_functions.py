from time import sleep
from random import randint
import requests
import utils
import urls

# test sign up post success
def do_sign_up_post_suceess_test(userNum):

    for i in range(0, userNum):
        username = "test" + str(i)
        email = "test" + str(i) + "@naver.com"
        password = "1234qwer"

        utils.delete_user( username )
        utils.sign_up_success( username, email, password )

    print("sign up test success\n")

# test sign up post fail by same id
def do_sign_up_post_fail_test(userNum):

    for i in range(0, userNum):
        username = "test" + str(i)
        email = "test" + str(i) + "@naver.com"
        password = "1234qwer"

        utils.sign_up_fail( username, email, password )

    print( "sign up fail test success\n" )


# test login success
def do_login_success_test(userNum):

    for i in range(0, userNum):
        username = "test" + str(i)
        password = "1234qwer"

        utils.login_success( username, password )

    print( 'login success test success\n' )

# test login fail
def do_login_fail_test(userNum):
    # by wrong username
    for i in range(20, 30):
        username = "test" + str(i)
        password = "1234qwer"

        utils.delete_user( username )
        utils.login_fail( username, password )

    print( "login fail by username test success\n" )

    # by wrong password
    for i in range(0, userNum):
        username = "test" + str(i)
        password = "qwer1234"

        utils.login_fail( username, password )

    print( "login fail by password test success\n" )

# test user delete fail
def do_user_delete_fail_test(userNum):

    for i in range(0, userNum):
        username = "test" + str(i)
        utils.delete_user_fail( username )

    print( 'delete user fail by normal user susccess\n' )

# test user delete success
def do_user_delete_success_test(userNum):

    for i in range(0, userNum):
        username = "test" + str(i)
        utils.delete_user( username )

    print( 'delete user by sns_admin success\n' )

# test posting suceess
def do_posting_success_test(userNum):

    for i in range(0, userNum):
        username = "test" + str(i)
        password = "1234qwer"
        text = "This is test text."

        utils.posting_success( username, password, text )

    print ( 'posting by normal users success\n' )

# test posting fail
def do_posting_fail_test():

    for i in range(20):
        text = "This is test text."

        utils.posting_fail( str(i), text )

    print ( 'posting fail by no authentication\n' )


# test get posts success
def do_get_posts_success_test(userNum):

    for i in range(0, userNum):
        username = "test" + str(i)
        password = "1234qwer"
        text = "This is test text."

        utils.get_posts( username, password, text, userNum )

    print ( 'get posts by normal users success\n' )

def do_get_posts_fail_test():

    for i in range(20):
        utils.get_posts_fail( str(i) )

    print ( 'get posts fail by no authentication\n' )


def do_like_test():
    # test msg
    like_fail_msg = "update like fail"
    like_success_msg = "update like success"
    dislike_success_msg = "update unlike success"

    # test start..
    test_auth = ("sns_admin", "123")

    # test like success
    print("(1) checking update like post by POST\n")

    utils.like_post_test(test_auth, 1, like_success_msg, 200)

    print("update like post test success\n")

    # test dislike success
    print("(2) checking update unlike post success by POST\n")

    utils.like_post_test(test_auth, 1, dislike_success_msg, 200)

    print("update unlike post test success\n")

    # test like_fail
    print("(3) checking update like post fail by POST\n")

    # post that does not exist
    utils.like_post_test(test_auth, 1000, like_fail_msg, 404)

    print("update unlike post test success\n")

    # test like success
    print("(1) checking update like comment by POST\n")

    utils.like_comment_test(test_auth, 1, like_success_msg, 200)

    print("update like comment test success\n")

    # test dislike success
    print("(2) checking update unlike comment success by POST\n")

    utils.like_comment_test(test_auth, 1, dislike_success_msg, 200)

    print("update unlike comment test success\n")

    # test like_fail
    print("(3) checking update unlike comment fail by POST\n")

    # post that does not exist
    utils.like_comment_test(test_auth, 1000, like_fail_msg, 404)

    print("update unlike comment test success\n")


def do_comment_test():
    comment_fail_msg = "update comment fail"
    comment_success_msg = "update comment success"
    get_comment_fail_msg = "get comment fail"
    get_comment_success_msg = "update comment success"
    # test start..
    test_auth = ("sns_admin", "123")
    # test comment on the first post
    # this test should be done after a post is made
    print("(1) checking update comment by POST\n")
    utils.post_comment_test(test_auth, 1, comment_success_msg)
    print("update comment test success\n")
    # test get comment
    print("(2) checking comment by GET\n")
    utils.get_comment_test(test_auth, 1, get_comment_success_msg)
    print("get comment test success\n")

def do_post_delete_test():
    test_user1 = ( 'test1', 'test1@test.com', '1234qwer' )
    test_user2 = ( 'test2', 'test2@test.com', '1234qwer' )

    # post user which will be used for test
    utils.delete_user( test_user1[0] )
    utils.delete_user( test_user2[0] )
    utils.sign_up_success( test_user1[0], test_user1[1], test_user1[2] )
    utils.sign_up_success( test_user2[0], test_user2[1], test_user2[2] )

    # post postings for test
    post_text = 'text'
    post1_0 = utils.posting_success( test_user1[0], test_user1[2], post_text)
    post1_1 = utils.posting_success( test_user1[0], test_user1[2], post_text)
    post1_2 = utils.posting_success( test_user1[0], test_user1[2], post_text)

    # delete & put fail test
    utils.post_delete_fail( (test_user2[0], test_user2[2]), post1_0.json()['id'] )

    utils.post_put_fail( (test_user2[0], test_user2[2]), post1_0.json()['id'] )

    # delete & put success test
    utils.post_delete_success( (test_user1[0], test_user1[2]), post1_1.json()['id'] )

    utils.post_put_success( (test_user1[0], test_user1[2]), post1_2.json()['id'] )
    
    print('post delete test success')


def do_get_users_test():
    # create user for test
    test_users = []
    for i in range(0, 20):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)

    for i in range(0, 20):
        utils.get_users_success( (test_users[i][0], test_users[i][2]) )

    for i in range(0, 20):
        utils.get_users_fail( (test_users[i][0], '1234') )
    

def do_get_chat_rooms_test():
    # create user for test
    test_users = []
    for i in range(0, 20):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)

    for i in range(0, 20):
        utils.get_chat_rooms_success( (test_users[i][0], test_users[i][2]) )

    for i in range(0, 20):
        utils.get_chat_rooms_fail( (test_users[i][0], '1234') )
 

def do_post_chat_rooms_test():
    # create user for test
    test_users = []
    for i in range(0, 20):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)

    for i in range(0, 10):
        utils.post_chat_rooms_success( (test_users[i][0], test_users[i][2]), test_users[i+10][0] )

    for i in range(10, 20):
        utils.post_chat_rooms_fail( (test_users[i][0], test_users[i][2]) )
    
def do_get_messages_test():
    # create users for test
    test_users = []
    for i in range(0, 4):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)

    # create room for test
    url = urls.chatroomlist_url()
    auth = ( test_users[0][0], test_users[0][2] )
    data = { 'user2': test_users[1][0] }
    res = requests.post( url, data, auth=auth )
    roomid = res.json()['id']

    # test
    for i in range(0, 2):
        utils.get_chat_messages_success( (test_users[i][0], test_users[i][2]), roomid )

    for i in range(2, 4):
        utils.get_chat_messages_fail( (test_users[i][0], test_users[i][2]), roomid )


def do_post_messages_test():
    test_users = []
    for i in range(0, 4):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)

    # create room for test
    url = urls.chatroomlist_url()
    auth = ( test_users[0][0], test_users[0][2] )
    data = { 'user2': test_users[1][0] }
    res = requests.post( url, data, auth=auth )
    roomid = res.json()['id']

    # test
    for i in range(0, 2):
        utils.post_chat_messages_success( (test_users[i][0], test_users[i][2]), roomid )

    for i in range(2, 4):
        utils.post_chat_messages_fail( (test_users[i][0], test_users[i][2]), roomid )

#groupchat test

def do_post_groupchat_rooms_test():
    # create user for test
    test_users = []
    for i in range(0, 5):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)
	#the first user will make groupchat room with others
    utils.post_groupchat_rooms_success( test_users )
    print("posting groupchat room success\n")
    
def do_get_groupchat_rooms_test():
    # create user for test
    test_users = []
    for i in range(0, 5):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)
	#the first user makes groupchat room with others
    utils.post_groupchat_rooms_success( test_users )
	#get check from each user that they are put in room 
    for i in range(0, 5):
        utils.get_groupchat_rooms_success( test_users[i] )
    print("get groupchat room success\n")

def do_adduser_groupchat_room_test():
    # create user for test
    test_users = []
    for i in range(0, 5):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)
	#the first user makes groupchat room with others
    auth = (test_users[0][0], test_users[0][2])
    utils.post_groupchat_rooms_success( test_users )
	#get check from each user that they are put in room 
    for i in range(0, 5):
        roomid = utils.get_groupchat_rooms_success( test_users[i] )
    #create more users
    test_users = []
    for i in range(5, 10):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)
    #add new users to original room
    utils.addusers_groupchat_rooms_success( test_users , auth, roomid)
    print("adding more users to existing groupchat room success\n")

def do_exit_groupchat_room_test():
    # create user for test
    test_users = []
    for i in range(0, 5):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)
	#the first user will make groupchat room with others
    utils.post_groupchat_rooms_success( test_users )
    #get the room id
    roomid = utils.get_groupchat_rooms_success( test_users[0] )
    #the every user exits from the room
    for i in range(0,5):
        auth = (test_users[i][0],test_users[i][2])
        utils.exit_groupchat_rooms_success( roomid, auth )
    print("deleting users from existing groupchat room success\n")
    
 

def do_get_groupchat_messages_test():
    # create users for test
    test_users = []
    for i in range(0, 5):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)
	#the first user makes groupchat room with others
    utils.post_groupchat_rooms_success( test_users )
	#the first user get the id of the room
    roomid = utils.get_groupchat_rooms_success( test_users[0] )
	#each user get messages from that room
    for i in range(0, 5):
        utils.get_groupchat_messages_success( (test_users[i][0], test_users[i][2]), roomid )
    print("get message from groupchat room success\n")

def do_post_groupchat_messages_test():
    test_users = []
    for i in range(0, 5):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)

	#the first user makes groupchat room with others
    utils.post_groupchat_rooms_success( test_users )
	#the first user get the id of the room
    roomid = utils.get_groupchat_rooms_success( test_users[0] )

    #each user posts a message to that room
    for i in range(0, 5):
        utils.post_groupchat_messages_success( (test_users[i][0], test_users[i][2]), roomid )
    print("post message to groupchat room success")

def do_get_wall_test():
    # test start..
    test_auth = ("sns_admin", "123")
    utils.get_wall_posts_sucess(test_auth, "sns_admin")
    utils.get_wall_posts_fail(test_auth, "sns_admin")

def do_post_image_test():
    # create test user
    test_user = ( 'test0', 'test0@test.com', '1234qwer' )
    utils.delete_user(test_user[0])
    utils.sign_up_success( test_user[0], test_user[1], test_user[2] )

    # post image test
    utils.post_image_success( (test_user[0], test_user[2]) )

    print('post image test success')

def do_put_email_test():
    # create test user
    test_user = ( 'test0', 'test0@test.com', '1234qwer' )
    utils.delete_user(test_user[0])
    utils.sign_up_success( test_user[0], test_user[1], test_user[2] )

    # put email test
    utils.put_email_success( (test_user[0], test_user[2]) )

def do_put_password_test():
    # create test user
    test_user = ( 'test0', 'test0@test.com', '1234qwer' )
    utils.delete_user(test_user[0])
    utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
    
    # put password test
    utils.put_password_success( (test_user[0], test_user[2]) )
