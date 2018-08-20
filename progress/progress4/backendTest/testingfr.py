import requests
from time import sleep
import json
import utils

def post():
#    data = { 'roomid': 3, }
#    data = {"status":1}
    auth = ('sns_admin','123')
    data = {'user':'bae', 'status':0}
#send friend request
    requests.post( "http://localhost:8000/friendrequest/", data, auth=auth )
    auth = ('sns_admin','123')
#get friend requests
    res = requests.get( "http://localhost:8000/friendrequest/", data, auth=auth )
    items = json.loads(res.text) #mixed request
    for item in items:
        print(item)
        if item['status'] == 0:
            if item['user_to'] == 'bae':
                requestid = item['id']
                break
    print(requestid)
#now bae accept request with known id(in fact, bae must get requests again
    auth = ('sns_admin','123')
    data  = {'status':1}
    res = requests.patch( "http://localhost:8000/friendrequest/"+str(requestid)+"/", data, auth=auth )
    res = requests.get( "http://localhost:8000/myfriend/", auth=auth )
		#get id of user(in friend list) 
    items = json.loads(res.text) #mixed request
    print(items)
    id = items[0]['id']
    print(id)
    if res.status_code == 200:
        exit(1)

    else:
        print(res.status_code )

"""    #now bae deletes friend

    data = {'user':'sns_admin'}
    res = requests.patch( "http://localhost:8000/myfriend/"+str(id)+"/", data, auth=auth )
"""
friendrequest = "http://localhost:8000/friendrequest/"
myfriend = "http://localhost:8000/myfriend/"
def accept_friend_request_success(auth, requestid):
    data  = {'status':1}
    res = requests.patch( friendrequest+str(requestid)+"/", data, auth=auth )
    print('accepted :'+str(res.status_code))

def post_friend_request_success(auth, username):
    data = {'user':username }
    res = requests.post(friendrequest, data, auth=auth)

def get_friend_request_success(auth,username):
    res = requests.get(friendrequest, auth=auth)
    allrequests = json.loads(res.text)
    for request in allrequests:
        print(username)
        if request['user_from'] == username:
            print(request['id'])
            return request['id']
#    exit(1)
    
def do_friend_request_test():

    # create users for test
    test_users = []
    for i in range(0, 10):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)
	#each first five user sends friend request to other 5 users
    for i in range(0, 5):
        auth = (test_users[i][0],test_users[i][2])
        for j in range(5,10):
            user = (test_users[j][0])
            post_friend_request_success(auth, user)
	#request - back => try already existent request
    for i in range(5, 10):
        auth = (test_users[i][0],test_users[i][2])
        for j in range(0,5):
            user = (test_users[j][0])
            post_friend_request_success(auth, user)
    #othef 5 users get the request and accept request
#fail test first - name change needed
    for i in range(0,5):
        auth = (test_users[i][0],test_users[i][2])
        for j in range(5,10):
            user = (test_users[j][0])
            requestid = get_friend_request_success(auth, user)
            print(requestid)
            accept_friend_request_success(auth, requestid)
#friend request sender cannot accept => test add
    for i in range(5,10):
        auth = (test_users[i][0],test_users[i][2])
        for j in range(0,5):
            user = (test_users[j][0])
            requestid = get_friend_request_success(auth, user)
            print(requestid)
            accept_friend_request_success(auth, requestid)

do_friend_request_test()
