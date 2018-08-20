import utils
import urls
import requests
import json

def do_timeline_permission_test():
    #create test user
    test_users = []
    for i in range(0, 2):
        username = 'test' + str(i)
        test_user = ( username, username + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append( test_user )

    utils.posting_success( test_users[0][0], test_users[0][2], 'test0 posts this posting' )
    utils.posting_success( test_users[1][0], test_users[1][2], 'test1 posts this posting' )

    postList = requests.get( urls.posts_url(), auth = ( test_users[1][0], test_users[1][2] ) )

    for post in postList.json():
        if post['user'] == test_user[0][0]:
            print( 'error: test1 can access post by test0 who is not friend of him.' )

    utils.post_friendrequest( ( test_users[0][0], test_users[0][2] ), test_users[1][0] )
    request_id=[]
    request_id.append(0)
    request_id.append( utils.get_friendrequest( (test_users[1][0], test_users[1][2]), test_users[0][0] ) )

    utils.accept_friendrequest( ( test_users[1][0], test_users[1][2]), request_id[1] )

    postList = requests.get( urls.posts_url(), auth = ( test_users[1][0], test_users[1][2] ) )

    friendPostShow = False
    for post in postList.json():
        # print( post )
        if post['user'] == test_users[0][0]:
            friendPostShow = True

    if not friendPostShow:
        print( 'error: test1 cannot access post by test0 who is his friend' )
        exit(1)


print( 'timeline permission test, i.e. show only posts of friends and user' )
do_timeline_permission_test()
print( 'timeline permission test success' )
