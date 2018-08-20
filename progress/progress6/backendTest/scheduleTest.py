from time import sleep
from random import randint
import requests
import utils
import urls
import json
import datetime
import time

def post_schedule_success( auth, start, end, detail ):
    url = urls.schedule_url()
    data={ 'start': start, 'end': end, 'title': detail }
    res = requests.post( url, data, auth=auth, verify=False )

    if res.status_code != 200:
        print( 'error!: user {0} cannot post schedule'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} post schedule success'.format(auth[0]) )

def get_schedules_success( auth ):
    url = urls.schedule_url()
    res = requests.get( url, auth=auth, verify=False )

    if res.status_code != 200:
        print( 'error!: user {0} cannot get schedules'.format(auth[0]) )
        exit(1)

    else:
        print( 'user {0} get schedules success'.format(auth[0]) )

def do_schedule_test():
    print("schedule test starts...\n")

    # create users for test
    test_users = []
    print("1.creating 10 users... user test0 to test9\n")
    for i in range(0, 10):
        test_user = ( 'test' + str(i), 'test' + str(i) + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append(test_user)

    # schedule test
    print ("\n2. test posting schedule by each user.")
    now = datetime.datetime.now()

    start = now
    end = now + datetime.timedelta(hours=1)

    start = time.mktime(start.timetuple()) * 1000
    end = time.mktime(end.timetuple()) * 1000

    detail = "test"

    for user in test_users:
        post_schedule_success((user[0], user[2]), start, end, detail)

    print ("\n3. test getting schedules by each user.")
    for user in test_users:
        get_schedules_success((user[0], user[2]))

    print('schedule test success')


do_schedule_test()
