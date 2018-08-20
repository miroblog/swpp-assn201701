import utils
import urls
import requests
import json
import datetime
import time

def do_share_schedule_test():
    #create test user
    print ("\n1. create 3 users")
    test_users = []
    for i in range(0, 3):
        username = 'test' + str(i)
        test_user = ( username, username + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append( test_user )
    
    print ("\n2. the first user sends friend request and others accept")
    # make friend..
    utils.post_friendrequest( ( test_users[0][0], test_users[0][2] ), test_users[1][0] )
    request_id=[]
    request_id.append(0)
    request_id.append( utils.get_friendrequest( (test_users[1][0], test_users[1][2]), test_users[0][0] ) )
    utils.accept_friendrequest( ( test_users[1][0], test_users[1][2]), request_id[1] )

    utils.post_friendrequest( ( test_users[0][0], test_users[0][2] ), test_users[2][0] )
    request_id=[]
    request_id.append(0)
    request_id.append( utils.get_friendrequest( (test_users[2][0], test_users[2][2]), test_users[0][0] ) )
    utils.accept_friendrequest( ( test_users[2][0], test_users[2][2]), request_id[1] )


	#the first user sends a schedule invitation to other two
    now = datetime.datetime.now()

    start = now
    end = now + datetime.timedelta(hours=1)

    start = time.mktime(start.timetuple()) * 1000
    end = time.mktime(end.timetuple()) * 1000

    schedule = (start, end, 'mock schedule')
    print ("\n3. the first user send share schedule request to others")
    post_share_schedule_success( (test_users[0][0], test_users[0][2]), ((test_users[1][0]), test_users[2][0]), schedule)
    
    print ("\n4. the schedule is added to the first user")
    get_schedules_success((test_users[0][0],test_users[0][2]))

    print ("\n5. the other users can get shared schedule")
    share_id = []
    share_id.append(0)
    share_id.append(get_share_schedule_success((test_users[1][0],test_users[1][2])))
    share_id.append(get_share_schedule_success((test_users[2][0],test_users[2][2])))

    print ("\n6. the second user rejects shared schedule")
    delete_share_schedule_success((test_users[1][0],test_users[1][2]),share_id[1])

    print ("\n7. the third user accepts shared schedule")
    put_share_schedule_success((test_users[2][0],test_users[2][2]),share_id[2])
    print ("\n8. the second user has no request, no schedule")
    get_schedules_success((test_users[1][0],test_users[1][2]))
    print ("\n9. the third user has the schedule in calendar")
    get_schedules_success((test_users[2][0],test_users[2][2]))

def delete_share_schedule_success(auth, id):
    url = urls.share_schedule_detail_url(id);
    res = requests.delete(url,auth=auth, verify=False)
    if res.status_code != 204:
        print( 'error!: user {0} cannot share schedule'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} post share schedule success'.format(auth[0]) )
def put_share_schedule_success(auth, id):
    url = urls.share_schedule_detail_url(id);
    res = requests.put(url,auth=auth, verify=False)
    if res.status_code != 200:
        print( 'error!: user {0} cannot share schedule'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} post share schedule success'.format(auth[0]) )

def post_share_schedule_success( auth, users_to, schedule ):
    url = urls.share_schedule_url()
    data={ 'start': schedule[0], 'end': schedule[1], 'title': schedule[2]}
    i= 1
    for user in users_to:
        index = 'user'+str(i)
        data[index] = users_to[i-1]
        i=i+1
    print(data)
    res = requests.post( url, data, auth=auth, verify=False )

    if res.status_code != 200:
        print( 'error!: user {0} cannot share schedule'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} post share schedule success'.format(auth[0]) )

def get_schedules_success( auth ):
    url = urls.schedule_url()
    res = requests.get( url, auth=auth, verify=False )

    if res.status_code != 200:
        print( 'error!: user {0} cannot get schedules'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} get schedules success'.format(auth[0]) )


def get_share_schedule_success(auth):
    url = urls.share_schedule_url()
    res = requests.get(url, auth=auth, verify=False)
    data = json.loads(res.text)
    print(data)
    if res.status_code != 200:
        print( 'error!: user {0} cannot get shared schedule'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} get shared schedule success'.format(auth[0]) )
        return data[0]['id']

print( 'Testing Sharing Schedule with other friends\n' )
do_share_schedule_test()
print( '\nSchedule Share test success' )
