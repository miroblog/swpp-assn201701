import requests
from time import sleep
from random import randint
def update_comment_link():
    return "http://localhost:8000/comments/"
def get_comment_link(post_id):
    return "http://localhost:8000/posts/"+post_id+"/comments/"
comment_fail_msg = "update comment fail"
comment_success_msg = "update comment success"
get_comment_fail_msg = "get comment fail"
get_comment_success_msg = "update comment success"
def post_comment_test(auth, post_id, test_msg):
    comment = 'testing comment'
    data = {'post': post_id, 'comment': comment}
    res = requests.post(update_comment_link(), data, auth=auth)
    if res.status_code != 201:
        print( 'error!: {0} {1}comment fail'.format(post_id, test_msg) )
        exit(1)
    else:
        print( "comment success: {0} {1}".format(post_id, test_msg) )
def get_comment_test(auth, post_id, test_msg):
    comment = 'testing comment'
    res = requests.get(get_comment_link(str(post_id)), auth=auth)
    if res.status_code != 200:
        print( 'error!: {0} {1}comment fail'.format(post_id,test_msg) )
        exit(1)
    else:
        print( "comment success: {0} {1}".format(post_id, test_msg) )
# test start..
test_auth = ("sns_admin", "123")
# test comment on the first post
# this test should be done after a post is made
print("1. checking update comment by POST\n")
post_comment_test(test_auth,1,comment_success_msg)
print("update comment test success\n")
# test get comment
print("2. checking comment by GET\n")
get_comment_test(test_auth,1, get_comment_success_msg)
print("get comment test success\n")
