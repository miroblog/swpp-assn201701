import utils
import urls
import requests
import json

def do_wall_permission_test():
    #create test user
    test_users = []
    for i in range(0, 2):
        username = 'test' + str(i)
        test_user = ( username, username + '@test.com', '1234qwer' )
        utils.delete_user( test_user[0] )
        utils.sign_up_success( test_user[0], test_user[1], test_user[2] )
        test_users.append( test_user )
    
    # post wall fail because they are not friend
    utils.post_wall_fail( (test_users[0][0], test_users[0][2]), test_users[1][0], 'test0 posts this posting' )
    utils.post_wall_fail( (test_users[1][0], test_users[1][2]), test_users[0][0], 'test1 posts this posting' )

    # get wall fail because they are not friend
    utils.get_wall_posts_fail( ( test_users[0][0], test_users[0][2] ), test_users[1][0] )
    utils.get_wall_posts_fail( ( test_users[1][0], test_users[1][2] ), test_users[0][0] )

    # make friend..
    utils.post_friendrequest( ( test_users[0][0], test_users[0][2] ), test_users[1][0] )
    request_id=[]
    request_id.append(0)
    request_id.append( utils.get_friendrequest( (test_users[1][0], test_users[1][2]), test_users[0][0] ) )
    utils.accept_friendrequest( ( test_users[1][0], test_users[1][2]), request_id[1] )


    # post wall success because they are friend
    utils.post_wall_success( (test_users[0][0], test_users[0][2]), test_users[1][0], 'test0 posts this posting' )
    utils.post_wall_success( (test_users[1][0], test_users[1][2]), test_users[0][0], 'test1 posts this posting' )

    # get wall success because they are friend
    utils.get_wall_posts_success( ( test_users[0][0], test_users[0][2] ), test_users[1][0] )
    utils.get_wall_posts_success( ( test_users[1][0], test_users[1][2] ), test_users[0][0] )


print( 'wall permission test, i.e. show only posts of friends and user & only user and friend can post\n' )
do_wall_permission_test()
print( '\nwall permission test success' )
