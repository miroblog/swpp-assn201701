from time import sleep
from random import randint
import utils

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
    dislike_success_msg = "update dislike success"

    # test start..
    test_auth = ("sns_admin", "123")

    # test like success
    print("(1) checking update like by POST\n")

    utils.like_test(test_auth, 1, "true", like_success_msg, 200)

    print("update like test success\n")

    # test dislike success
    print("(2) checking update dislike success by POST\n")

    utils.like_test(test_auth, 1, "false", dislike_success_msg, 200)

    print("update dislike test success\n")

    # test like_fail
    print("(3) checking update dislike fail by POST\n")

    # post that does not exist
    utils.like_test(test_auth, 1000, "false", like_fail_msg, 404)

    print("update dislike test success\n")

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