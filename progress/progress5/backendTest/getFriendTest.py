import utils
import urls
import requests
import json

def do_get_friend_test():
    #create test user
    test_users = []
    for i in range(0, 2):
        username = 'test' + str(i)
        test_user = ( username, username + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append( test_user )
    
    # test0 doesn't have test1 as friend
    friends = utils.get_friends_success( (test_users[0][0], test_users[0][2]) )

    for friend in friends.json():
        if friend['username'] == test_users[1][0]:
            print('error: {0} has {1} as friend'.format(test_users[0][0], test_users[1][0]))
            exit(1)

    # make friend..
    utils.post_friendrequest( ( test_users[0][0], test_users[0][2] ), test_users[1][0] )
    request_id=[]
    request_id.append(0)
    request_id.append( utils.get_friendrequest( (test_users[1][0], test_users[1][2]), test_users[0][0] ) )
    utils.accept_friendrequest( ( test_users[1][0], test_users[1][2]), request_id[1] )

    # test0 has test1 as friend
    friends = utils.get_friends_success( (test_users[0][0], test_users[0][2]) )

    hasFriend = False
    for friend in friends.json():
        if friend['username'] == test_users[1][0]:
            hasFriend = True

    if not hasFriend:
        print('error: {0} does not have {1} as friend'.format(test_users[0][0], test_users[1][0]))
        exit(1)


print( 'start get friend test, i.e. get my friends based on model User\n' )
do_get_friend_test()
print( '\nget friend test success' )
