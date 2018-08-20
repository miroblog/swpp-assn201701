import requests
from time import sleep
import urls

# sign_up user: success
def sign_up_success( username, email, password ):
    data = { 'username': username,
            'email': email,
            'password': password}
    res = requests.post( urls.userlist_url(), data )

    if res.status_code != 201:
        print( 'error!: {0} post fail'.format(username) )
        exit(1)

    else:
        print( "post success: {0}".format(username) )


# sign_up user: fail
def sign_up_fail( username, email, password ):
    data = { 'username': username,
            'email': email,
            'password': password}
    res = requests.post( urls.userlist_url(), data )

    if res.status_code != 400:
        print( 'error!: {0} post success'.format(username) )
        exit(1)

    else:
        print( "post fail: {0}".format(username) )


# delete username if exist
def delete_user( username ):
    userlist = requests.get( urls.userlist_url(), auth=( 'sns_admin', '123' ) )

    if userlist.status_code != 200:
        print( 'test error: sns_admin cannot get user list' )
        exit(1)

    for user in userlist.json():
        if user['username'] == username:
            delete = requests.delete( urls.userdetail_url( user['id'] ), auth=( 'sns_admin', '123' ) )

            if delete.status_code != 204:
                print( 'error: delete exist user {0} fail'.format( username ) )
                exit(1)

            print( 'delete user {0}'.format(username) )
            break

# delete user by normal user(fail)
def delete_user_fail( username ):
    userlist = requests.get( urls.userlist_url(), auth=( 'sns_admin', '123' ) )

    if userlist.status_code != 200:
        print( 'test error: sns_admin cannot get user list' )
        exit(1)

    for user in userlist.json():
        if user['username'] == username:
            delete = requests.delete( urls.userdetail_url( user['id'] ), auth=( username, '1234qwer' ) )

            if delete.status_code == 204:
                print( 'error: delete exist user {0} success'.format( username ) )
                exit(1)

            print( 'delete user {0} fail'.format(username) )
            break


# login success
def login_success(username, password):
    res = requests.post( urls.login_url(), auth=( username, password ) )
    # print( res )

    if res.status_code != 201:
        print( 'error: {0} login fail'.format(username) )
        exit(1)

    print( '{0} login success'.format(username) )


# login fail
def login_fail(username, password):
    res = requests.post( urls.login_url(), auth=( username, password ) )
    # print( res )

    if res.status_code != 403:
        print( 'error: {0} login fail fail'.format(username) )
        exit(1)

    print( '{0} login fail'.format(username) )

# posting success
def posting_success(username, password, text):
    data = {
        'text': text
    }
    res = requests.post( urls.posts_url(), data, auth=( username, password ) )
    # print ( res.json() )

    if res.status_code != 201:
        print( 'error: {0} posting fail'.format(username) )
        exit(1)

    print( '{0} posting success'.format(username) )
    return res

# posting fail by no authentication
def posting_fail(testNum, text):
    data = {
        'text': text
    }
    res = requests.post( urls.posts_url(), data )
    #print ( res )

    if res.status_code != 403:
        print( 'error!: {0} post success'.format(testNum) )
        exit(1)

    else:
        print( "posting fail: {0}".format(testNum) )

# get posts success
def get_posts(username, password, text, userNum):
    postList = requests.get( urls.posts_url(), auth=( username, password) )
    #print ( res )

    if postList.status_code != 200:
        print( 'test error: sns_admin cannot get user list' )
        exit(1)

    for i in range(0, userNum):
        uname = "test" + str(i)
        postExistFlag = False

        for post in postList.json():
            if post['user'] == uname:
                postExistFlag = True

                if post['text'] != text:
                    print( 'error: get posts user {0} fail'.format( username ) )
                    exit(1)

                break

        if postExistFlag == False:
            print( 'error: get posts user {0} fail'.format( username ) )
            exit(1)

    print( '{0} get posts success'.format(username) )

# get posts fail by no authentication
def get_posts_fail(testNum):
    res = requests.get( urls.posts_url())
    #print ( res )

    if res.status_code != 403:
        print( 'error!: {0} get posts success'.format(testNum) )
        exit(1)

    else:
        print( "get posts fail: {0}".format(testNum) )


def like_post_test(auth, post_id, test_msg, error_code):
    data = {'id': post_id,
            'emoji': "like"}
    res = requests.post(urls.update_like_post_url(), data, auth=auth)

    # on test fail
    if res.status_code != error_code:
        print('error: {0} {1} failed'.format(post_id, test_msg))
        exit(1)
    # on test success
    print('post id {0}, {1} success'.format(post_id, test_msg))

def like_comment_test(auth, comment_id, test_msg, error_code):
    data = {'id': comment_id,
            'emoji': "like"}
    res = requests.post(urls.update_like_comment_url(), data, auth=auth)

    # on test fail
    if res.status_code != error_code:
        print('error: {0} {1} failed'.format(comment_id, test_msg))
        exit(1)
    # on test success
    print('comment id {0}, {1} success'.format(comment_id, test_msg))


def post_comment_test(auth, post_id, test_msg):
    comment = 'testing comment'
    data = {'post': post_id, 'comment': comment}
    res = requests.post(urls.update_comment_url(), data, auth=auth)
    if res.status_code != 201:
        print( 'error!: {0} {1}comment fail'.format(post_id, test_msg) )
        exit(1)
    else:
        print( "comment success: {0} {1}".format(post_id, test_msg) )
def get_comment_test(auth, post_id, test_msg):
    comment = 'testing comment'
    res = requests.get(urls.get_comment_url(str(post_id)), auth=auth)
    if res.status_code != 200:
        print( 'error!: {0} {1}comment fail'.format(post_id,test_msg) )
        exit(1)
    else:
        print( "comment success: {0} {1}".format(post_id, test_msg) )


def post_delete_fail( auth, pk ):
    url = urls.postdetail_url( pk )
    res = requests.delete(url, auth=auth)

    if res.status_code != 403:
        print( 'error!: post {0} is deleted by user {1} who is not author of the post'.format(pk, auth[0]) )
        exit(1)

    else:
        print( 'post delete fail test success' )

def post_put_fail( auth, pk ):
    url = urls.postdetail_url( pk )
    data = { 'text': 'revised text'}
    res = requests.put( url, data, auth=auth )

    if res.status_code != 403:
        print( 'error!: post {0} is putted by user {1} who is not author of the post'.format(pk, auth[0]) )
        exit(1)

    else:
        print( 'post put fail test success' )

def post_delete_success( auth, pk ):
    url = urls.postdetail_url( pk )
    res = requests.delete(url, auth=auth)

    if res.status_code != 204:
        print( 'error!: post {0} is not deleted by user {1} who is the author of the post'.format(pk, auth[0]) )
        exit(1)

    else:
        print( 'post delete success test success' )

def post_put_success( auth, pk ):
    url = urls.postdetail_url( pk )
    data = { 'text': 'revised text'}
    res = requests.put( url, data, auth=auth )

    if res.status_code != 200:
        print( 'error!: post {0} is not putted by user {1} who is the author of the post'.format(pk, auth[0]) )
        exit(1)

    else:
        print( 'post put success test success' )

def get_users_success( auth ):
    url = urls.userlist_url()
    res = requests.get( url, auth = auth )

    if res.status_code != 200:
        print( 'error!: user {0} cannot get userlist'.format(auth[0]) )
        exit(1)
    
    else:
        print( 'user {0} get userlist success'.format(auth[0]) )


def get_users_fail( auth ):
    url = urls.userlist_url()
    res = requests.get( url, auth = auth )

    if res.status_code != 403:
        print( 'error!: unauthenticated user {0} get userlist'.format(auth[0]) )
        exit(1)
    
    else:
        print( 'user {0} get userlist fail success'.format(auth[0]) )

def get_chat_rooms_success( auth ):
    url = urls.chatroomlist_url()
    res = requests.get( url, auth = auth )

    if res.status_code != 200:
        print( 'error!: user {0} cannot get chat room list'.format(auth[0]) )
        exit(1)
    
    else:
        print( 'user {0} get chat room list success'.format(auth[0]) )


def get_chat_rooms_fail( auth ):
    url = urls.chatroomlist_url()
    res = requests.get( url, auth = auth )

    if res.status_code != 403:
        print( 'error!: unauthenticated user {0} get chat room list'.format(auth[0]) )
        exit(1)
    
    else:
        print( 'user {0} get chat room list fail success'.format(auth[0]) )

def post_chat_rooms_success( auth, user2 ):
    url = urls.chatroomlist_url()
    data = { 'user2': user2 }
    res = requests.post( url, data, auth = auth )

    if res.status_code != 200:
        print( 'error!: user {0} cannot post chat room with user {1}'.format(auth[0], user2) )
        exit(1)
    
    else:
        print( 'user {0} post chat room with user {1} success'.format(auth[0], user2) )


def post_chat_rooms_fail( auth ):
    url = urls.chatroomlist_url()
    data = { 'user2': 'nonExistUser' }
    res = requests.post( url, data, auth = auth )

    if res.status_code != 500:
        print( 'error!: user {0} post chat room with {1}'.format(auth[0], 'nonExistUser') )
        exit(1)
    
    else:
        print( 'user {0} with {1} post chat room fail success'.format(auth[0], 'nonExistUser') )

def get_chat_messages_success( auth, pk ):
    url = urls.chatroomdetail_url(pk)
    res = requests.get( url, auth=auth )

    if res.status_code != 200:
        print( 'error!: user {0} cannot get chat room detail'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} get messages success'.format(auth[0]) ) 

def get_chat_messages_fail( auth, pk ):
    url = urls.chatroomdetail_url(pk)
    res = requests.get( url, auth=auth )

    if res.status_code != 403:
        print( 'error!: unauthencated user {0} get chat room detail'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} fail to get messages success'.format(auth[0]) ) 

def post_chat_messages_success( auth, pk ):
    url = urls.chatroomdetail_url(pk)
    data={ 'text': 'test message',
            'room': pk }
    res = requests.post( url, data, auth=auth )

    if res.status_code != 201:
        print( 'error!: user {0} cannot post chat message at room#{1}'.format(auth[0], str(pk)) )
        exit(1)

    else:
        print( 'user {0} post messages success'.format(auth[0]) ) 

def post_chat_messages_fail( auth, pk ):
    url = urls.chatroomdetail_url(pk)
    data={ 'text': 'test message',
            'room': pk }
    res = requests.post( url, data, auth=auth )

    if res.status_code != 403:
        print( 'error!: unauthencated user {0} post chat messages'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} fail to post messages success'.format(auth[0]) ) 


