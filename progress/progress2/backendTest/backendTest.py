import test_functions as tests

# test start..
userNum = 20

print("1. checking sign up by POST\n")
tests.do_sign_up_post_suceess_test(userNum)
print("2. checking sign up fail by same id\n")
tests.do_sign_up_post_fail_test(userNum)
print("3. checking login success\n")
tests.do_login_success_test(userNum)
print( '4. checking login fail\n' )
tests.do_login_fail_test(userNum)
print( '5. checking user delete fail by normal user\n' )
tests.do_user_delete_fail_test(userNum)
print( '6. checking posting by normal users\n' )
tests.do_posting_success_test(userNum)
print( '7. checking posting fail by no authentication\n')
tests.do_posting_fail_test()
print( '8. checking get posts by normal users\n')
tests.do_get_posts_success_test(userNum)
print( '9. checking get posts fail by no authentication\n')
tests.do_get_posts_fail_test()
print( '10. checking user delete by sns_admin\n' )
tests.do_user_delete_success_test(userNum)

#added like test
print('11. do like test start\n')
tests.do_like_test()

#added comment test
print('12. do comment test start\n')
tests.do_comment_test()

print( "every test success!" )

