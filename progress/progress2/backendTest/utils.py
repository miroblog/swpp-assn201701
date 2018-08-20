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
    #print ( res )

    if res.status_code != 201:
        print( 'error: {0} posting fail'.format(username) )
        exit(1)

    print( '{0} posting success'.format(username) )

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


def like_test(auth, post_id, up, test_msg, error_code):
    data = {'id': post_id,
            'up': up}
    res = requests.post(urls.update_like_url(), data, auth=auth)

    # on test fail
    if res.status_code != error_code:
        print('error: {0} {1} failed'.format(post_id, test_msg))
        exit(1)
    # on test success
    print('post id {0}, {1} success'.format(post_id, test_msg))

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
