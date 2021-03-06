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
# print( '5. checking user delete fail by normal user\n' )
# tests.do_user_delete_fail_test(userNum)
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

# post and comment should be present before the test
# added like test
# print('11. do like test start\n')
# tests.do_like_test()

#added comment test
print('12. do comment test start\n')
tests.do_comment_test()

# post delete/put test
print('13. do post delete test start\n')
tests.do_post_delete_test()

# chat test: get users
print('14. do get users test start\n')
tests.do_get_users_test()

# chat test: get chat rooms
print('15. do get chat rooms test start\n')
tests.do_get_chat_rooms_test()

# chat test: post chat room
print('16. do post chat rooms test start\n')
tests.do_post_chat_rooms_test()

# chat test: get messages
print('17. do get messages test start\n')
tests.do_get_messages_test()

# chat test: post messages
print('18. do post messages test start\n')
tests.do_post_messages_test()

# groupchat test: post groupchat rooms
print('19. do post groupchat rooms test start\n')
tests.do_post_groupchat_rooms_test()

# groupchat test: get groupchat rooms
print('20. do get groupchat rooms test start\n')
tests.do_get_groupchat_rooms_test()

# groupchat test: adduser groupchat room
print('21. do adduser groupchat rooms test start\n')
tests.do_adduser_groupchat_room_test()

# groupchat test: exit groupchat room
print('22. do exit groupchat rooms test start\n')
tests.do_exit_groupchat_room_test()

# groupchat test: post messages
print('23. do post groupchat messages test start\n')
tests.do_get_groupchat_messages_test()

# groupchat test: get messages
print('24. do get groupchat messages test start\n')
tests.do_post_groupchat_messages_test()

# chat test: wall post get
print('25. do post messages test start\n')
tests.do_get_wall_test()

# image upload test
print('26. do post image test start\n')
tests.do_post_image_test()

# email change test
print('27. do put email test start\n')
tests.do_put_email_test()

# password change test
print('28. do put password test start\n')
tests.do_put_password_test()

print( "every test success!" )

