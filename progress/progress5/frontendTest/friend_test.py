import time
from selenium import webdriver
import uuid
import urls
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


def helperGet(id, max_delay=10):
    try:
        element = WebDriverWait(browser, max_delay).until(
            EC.presence_of_element_located((By.ID, id))
        )
        return browser.find_element_by_id(id)
    except TimeoutException:
        print("Loading took too much time for id :" + id)

def helperGetByName(name, max_delay=10):
    try:
        element = WebDriverWait(browser, max_delay).until(
            EC.presence_of_element_located((By.NAME, name))
        )
        return browser.find_element_by_name(name)
    except TimeoutException:
        print("Loading took too much time for name :" + name)


def do_navi_bar_click_test(menu):
    helperGet("navi_" + menu).click()
    time.sleep(4)
    # The page should be redirected to login page.


def search_and_goto_wall(username):
    helperGet('search_bar').send_keys(username[0:4])
    helperGet('search_btn').click()
    time.sleep(2)
    find = False
    searchnum = 0
    for i in range(30):
        if helperGet('search_result_user' + str(i)).text == username:
            searchnum = i
            find = True
            break

    if not find:
        print('error: cannot find user {0}'.format(username))
        exit(1)

    helperGet('search_result_user' + str(searchnum)).click()
    assert helperGet('wall_title').text == 'This is ' + username + '\'s wall'


def go_to_my_wall():
    do_navi_bar_click_test("profile")

def log_out():
    do_navi_bar_click_test("logout")
    time.sleep(1)

def login(username, pwd):
    do_navi_bar_click_test("login")
    time.sleep(1)
    helperGet('username_field').send_keys(username)
    helperGet('password_field').send_keys(pwd)
    helperGet('login_submit').click()


def post(text):
    helperGet('text').send_keys(text)
    time.sleep(4)
    helperGet('post_btn').click()
    time.sleep(6)


def signup(username, userpwd):
    helperGet('signup_page_link').click()
    helperGet('username_field').send_keys(username)
    helperGet('email_field').send_keys(username + "@test.com")
    helperGet('password_field').send_keys(userpwd)
    helperGet('password_confirm_field').send_keys(userpwd)
    helperGet('signup_submit').click()

def make_test_id():
    testid = str(uuid.uuid4())
    testid = testid[0:7]
    username = testid
    return username

def scenario_1():
    print("@ scenario 1: friend request accepted")

    print(">>> send the request : test1 -> test2")
    ###
    print('... login as test1')
    login(test1, '1234')
    time.sleep(2)

    print("... go to test2's wall")
    search_and_goto_wall(test2)
    time.sleep(2)

    print("... click send friend request")
    helperGetByName("navi_add_friends").click()
    time.sleep(2)
    ###
    print('... logout')
    log_out()
    time.sleep(2)

    print(">>> accept the request : test2 accepts")
    ###
    print('... login as test2')
    login(test2, '1234')
    time.sleep(2)

    print('... go to my wall')
    go_to_my_wall()
    time.sleep(2)

    print('... click view friend request')
    helperGetByName("navi_view_requests").click()
    time.sleep(2)

    print("... locate test1's request and accept")
    helperGetByName("add_" + test1).click()
    time.sleep(4)
    helperGet("confirm").click()
    time.sleep(2)

    print("... click friend list")
    helperGetByName("navi_view_friend_list").click()
    time.sleep(3)

    print("... friendship established")
    helperGetByName("confirm").click()
    time.sleep(2)

    print('... logout')
    log_out()
    time.sleep(2)

def scenario_2():
    print("@ scenario 2: friend request declined")
    print(">>> send the request : test3 -> test2")
    print('... login as test3')
    login(test3, '1234')
    print("... go to test2's wall")
    search_and_goto_wall(test2)
    time.sleep(2)
    print("... click send friend request")
    helperGetByName("navi_add_friends").click()
    time.sleep(2)
    print("... logout")
    log_out()

    print(">>> decline the request : test2 declines")
    print('... login as test2')
    login(test2, '1234')
    print('... go to my wall')
    go_to_my_wall()
    print('... click view friend request')
    helperGetByName("navi_view_requests").click()
    time.sleep(2)
    print("... locate test1's request and decline")
    helperGetByName("decline_" + test3).click()
    time.sleep(3)
    helperGet("confirm").click()
    time.sleep(2)
    print('... logout')
    log_out()
    time.sleep(2)

def scenario_3():
    print("@ scenario 3: cancel sent friend request(other's wallpage)")
    print(">>> send the request : test4 -> test2")
    print('... login as test4')
    login(test4, '1234')
    time.sleep(2)
    print("... go to test2's wall")
    search_and_goto_wall(test2)
    time.sleep(2)
    print("... click send friend request")
    helperGetByName("navi_add_friends").click()
    time.sleep(2)

    print(">>> cancel the request : test4 cancels")
    print('... click cancel button')
    helperGetByName("navi_cancel_request").click()
    time.sleep(2)
    print('... logout')
    log_out()
    time.sleep(2)

def scenario_4():
    print("@ scenario 4: cancel sent friend request(my wallpage)")
    print(">>> send the request : test5 -> test2")
    print('... login as test5')
    login(test5, '1234')
    print("... go to test2's wall")
    search_and_goto_wall(test2)
    time.sleep(2)
    print("... click send friend request")
    helperGetByName("navi_add_friends").click()
    time.sleep(2)
    print(">>> cancel the request : test5 cancels")
    print('... go to my wall')
    go_to_my_wall()
    time.sleep(2)
    print('... click view friend request')
    helperGetByName("navi_view_requests").click()
    time.sleep(2)
    print("... locate request made to test2 and cancel")
    helperGetByName("cancel_" + test2).click()
    time.sleep(3)
    helperGet("confirm").click()
    time.sleep(2)
    print("... logout")
    log_out()

def scenario_5():
    print("@ scenario 5: we are no longer friends :( (my wall page)")
    print('... login as test2')
    login(test1, '1234')
    time.sleep(2)
    print('... go to my wall')
    go_to_my_wall()
    time.sleep(2)
    print('... click view friend request')
    helperGetByName("navi_view_friend_list").click()
    time.sleep(2)
    print("... locate test2 and unfriend")
    helperGetByName("unfriend_" + test2).click()
    time.sleep(3)
    helperGetByName("confirm").click()
    time.sleep(2)
    print("... logout")
    log_out()

# get host url
url = urls.host_url()
browser = webdriver.Chrome('/usr/local/bin/chromedriver')
# go to the url
browser.get(url)


# make 4 test users
usernames = []
for i in range(5):
    usernames.append(make_test_id())

# do signup
print("... do sign up")
for name in usernames:
    print("signup test id: "+name)
    signup(name, '1234')

# test
test1 = usernames[0]
test2 = usernames[1]
test3 = usernames[2]
test4 = usernames[3]
test5 = usernames[4]



# send the request : test1 -> test2
# accept the request : test2 accepts
scenario_1()
# send the request : test3 -> test2
# decline the request : test2 declines
scenario_2()
# send the request : test4 -> test2
# cancels the request : test4 cancels (from test2's wall page)
scenario_3()
# send the request : test5 -> test2
# cancels the request : test5 cancels (from my wall page)
scenario_4()
# unfriend : test1 unfriends test2
scenario_5()


browser.quit()

print("done testing friend functionality")
