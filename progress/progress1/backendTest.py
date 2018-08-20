import requests
from time import sleep
from random import randint

def userlist_link():
    return "http://34.208.93.214:8000/users/"

def userdetail_link( pk ):
    return "http://34.208.93.214:8000/users/" + str(pk) + "/"

def login_link():
    return "http://34.208.93.214:8000/login/"

# sign_up user: success
def sign_up_success( username, email, password ):
    data = { 'username': username,
            'email': email,
            'password': password}
    res = requests.post( userlist_link(), data )

    if res.status_code != 201:
        print( 'error!: {0} post fail'.format(username) )
        exit(1)
    
    else:
        print( "post success: {0}".format(username) )

# sign_up user: fail
def sign_up_fail( username, email, password ):
    data = { 'username': username,
            'email': email,
            'password': password}
    res = requests.post( userlist_link(), data )

    if res.status_code != 400:
        print( 'error!: {0} post success'.format(username) )
        exit(1)
    
    else:
        print( "post fail: {0}".format(username) )


# delete username if exist
def delete_user( username ):
    userlist = requests.get( userlist_link(), auth=( 'sns_admin', '123' ) )

    if userlist.status_code != 200:
        print( 'test error: sns_admin cannot get user list' )
        exit(1)

    for user in userlist.json():
        if user['username'] == username:
            delete = requests.delete( userdetail_link( user['id'] ), auth=( 'sns_admin', '123' ) )

            if delete.status_code != 204:
                print( 'error: delete exist user {0} fail'.format( username ) )
                exit(1)

            print( 'delete user {0}'.format(username) )
            break

# delete user by normal user(fail)
def delete_user_fail( username ):
    userlist = requests.get( userlist_link(), auth=( 'sns_admin', '123' ) )

    if userlist.status_code != 200:
        print( 'test error: sns_admin cannot get user list' )
        exit(1)

    for user in userlist.json():
        if user['username'] == username:
            delete = requests.delete( userdetail_link( user['id'] ), auth=( username, '1234qwer' ) )

            if delete.status_code == 204:
                print( 'error: delete exist user {0} success'.format( username ) )
                exit(1)

            print( 'delete user {0} fail'.format(username) )
            break


# login success
def login_success(username, password):
    res = requests.post( login_link(), auth=( username, password ) )
    # print( res )

    if res.status_code != 201:
        print( 'error: {0} login fail'.format(username) )
        exit(1)

    print( '{0} login success'.format(username) )
    

# login fail
def login_fail(username, password):
    res = requests.post( login_link(), auth=( username, password ) )
    # print( res )

    if res.status_code != 403:
        print( 'error: {0} login fail fail'.format(username) )
        exit(1)

    print( '{0} login fail'.format(username) )
# test start..
UserNum = 20

# test post success
print("1. checking sign up by POST\n")
for i in range(0, UserNum):
    username = "test" + str(i)
    email = "test" + str(i) + "@naver.com"
    password = "1234qwer"
    
    delete_user( username )
    sign_up_success( username, email, password )
    
print("sign up test success\n")

# test post fail by same id
print("2. checking sign up fail by same id\n")
for i in range(0, UserNum):
    username = "test" + str(i)
    email = "test" + str(i) + "@naver.com"
    password = "1234qwer"

    sign_up_fail( username, email, password )

print( "sign up fail test success\n" )


# test login success
print("3. checking login success\n")
for i in range(0, UserNum):
    username = "test" + str(i)
    password = "1234qwer"

    login_success( username, password )

print( 'login success test success\n' )

# test login fail by wrong username
print( '4. checking login fail by wrong username' )
for i in range(20, 30):
    username = "test" + str(i)
    password = "1234qwer"
    
    delete_user( username )
    login_fail( username, password )

print( "login fail by username test success\n" )

# test login fail by wrong password
print( '5. checking login fail by wrong password\n' )
for i in range(0, UserNum):
    username = "test" + str(i)
    password = "qwer1234"
    
    login_fail( username, password )

print( "login fail by password test success\n" )


print( '6. checking user delete fail by normal user\n' )
for i in range(0, UserNum):
    username = "test" + str(i)
    delete_user_fail( username )

print( 'delete user fail by normal user susccess\n' )

# test user delete success
print( '7. checking user delete by sns_admin\n' )
for i in range(0, UserNum):
    username = "test" + str(i)
    delete_user( username )

print( 'delete user by sns_admin success\n' )
print( "every test success!" )
