from time import sleep
from random import randint
import requests
import utils
import urls
import json
def post_friendrequest( auth, user ):
    url = urls.friendrequest_list_url()
    data = { 'user':user}
    res = requests.post( url, data, auth = auth )
    if res.status_code != 200:
        print( 'error!: user {0} cannot post friendrequest'.format(auth[0]) )
        exit(1)
    
    else:
        print( 'user {0} post friendrequest to {1} success'.format(auth[0], user) )

def get_friendrequest( auth, user ):
    url = urls.friendrequest_list_url()
    res = requests.get( url,  auth = auth )
    data = json.loads(res.text)
    if res.status_code != 200:
        print( 'error!: user {0} cannot get friendrequest'.format(auth[0]) )
        exit(1)
    
    else:
        print( 'user {0} get friendrequests success'.format(auth[0]))
        return data[0]['id']

def delete_friendrequest( auth, id ):
    url = urls.friendrequest_detail_url(id)
    res = requests.delete( url,  auth = auth )

    if res.status_code != 204:
        print( 'error!: user {0} cannot delete friendrequest'.format(auth[0]) )
        exit(1)
    
    else:
        print( 'user {0} delete friendrequest success'.format(auth[0]) )

def accept_friendrequest( auth, id ):
    url = urls.friendrequest_detail_url(id)
    data = { 'status':1}
    res = requests.patch( url, data, auth = auth )
    if res.status_code != 200:
        print( 'user {0} cannot accept request'.format(auth[0]) )
    
    else:
        print( 'user {0} accept request success'.format(auth[0]) )
def get_myfriend( auth):
    url = urls.myfriend_list_url()
    res = requests.get( url,  auth = auth )
    data = json.loads(res.text)
    if res.status_code != 200:
        print( 'error!: user {0} cannot get myfriend list'.format(auth[0]) )
        exit(1)
    
    else:
        print( 'user {0} get myfriend list success'.format(auth[0]))
        return data[0]['id']

def delete_myfriend(auth, user, id):
    url = urls.myfriend_detail_url(id)
    data = {'user':user}
    res = requests.patch(url, data=data, auth=auth)
    if res.status_code != 200:
        print( 'error!: user {0} cannot unfriend with {1}'.format(auth[0], user) )
        exit(1)
    
    else:
        print( 'user {0} unfriend with {1} by updating list'.format(auth[0], user))


def do_friend_test():
    print("friend test starts...\n")
    # create user for test
    test_users = []
    print("1.creating 10 users... user test0 to test9\n")
    for i in range(0, 10):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)

    print("2.user test0 sends friend request to 9 users by POST\n")
    auth = (test_users[0][0], test_users[0][2])
    for i in range(1, 10):
        post_friendrequest( auth, test_users[i][0])
    print("3.users check friendrequests from test0 by GET\n")
    request_id=[]
    request_id.append(0)
    for i in range(1, 10):
        auth = (test_users[i][0], test_users[i][2])
        request_id.append( get_friendrequest( auth, test_users[0][0]) )
    print("4.user test1~ test3 decline the request from test0 by DELETE\n")
    for i in range(1, 4):
        auth = (test_users[i][0], test_users[i][2])
        delete_friendrequest( auth, request_id[i])
    print("5.user test0 tries to accept request(fail is correct) by PATCH")
    for i in range(4, 10):
        auth = (test_users[0][0], test_users[0][2])
        accept_friendrequest( auth, request_id[i])
    print("6.user test4~9 accept request by PATCH")
    for i in range(4, 10):
        auth = (test_users[i][0], test_users[i][2])
        accept_friendrequest( auth, request_id[i])
    print("7.all users get myfriend list by GET")
    friend_id=[]
    for i in range(0, 10):
        auth = (test_users[i][0], test_users[i][2])
        friend_id.append(get_myfriend( auth ))
    print("8.user test4~6 unfriend with test0 by PATCH")
    for i in range(4, 7):
        auth = (test_users[i][0], test_users[i][2])
        delete_myfriend(auth, test_users[0][0], friend_id[i])
	
    print("9.user test0 unfriend with test7~9 by PATCH")
    for i in range(7, 10):
        auth = (test_users[0][0], test_users[0][2])
        delete_myfriend(auth, test_users[i][0], friend_id[i])
    print("Friend Test Succeeded without error")
    
    
do_friend_test()

