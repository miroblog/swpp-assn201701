import time
from selenium import webdriver
import uuid
import urls
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.common.keys import Keys


def helperGet(id, max_delay=10):
    try:
        element = WebDriverWait(browser, max_delay).until(
            EC.presence_of_element_located((By.ID, id))
        )
        browser.execute_script("return arguments[0].scrollIntoView();", element)
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
    helperGet('search_bar').send_keys(Keys.ENTER)
    # helperGet('search_btn').click()
    time.sleep(4)
    find = False
    searchnum = None
    for i in range(30):

        if helperGet('search_result_user' + str(i)).text == username:

            searchnum = i

            find = True

            break
    if not find:

        print( 'error: cannot find user {0}'.format(username) )

        exit(1)

    helperGet( 'search_result_user' + str( searchnum ) ).click()
    assert helperGet('wall_title').text == 'Welcome to '+username+'\'s wall'



def go_to_my_wall():
    do_navi_bar_click_test("profile")

def log_out():
    do_navi_bar_click_test("logout")
    time.sleep(1)

def login(username, pwd):
    time.sleep(2)
    helperGet('username_field').send_keys(username)
    helperGet('password_field').send_keys(pwd)
    helperGet('login_submit').click()
    time.sleep(5)


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

def make_poll():
    helperGetByName("editor_poll").click()
    time.sleep(2)
    helperGet("poll_topic").click()
    helperGet("poll_topic").send_keys("what is your favorite food?")
    time.sleep(2)
    helperGet("poll_option_1").click()
    helperGet("poll_option_1").send_keys("Pizza")
    time.sleep(2)
    helperGet("poll_option_2").click()
    helperGet("poll_option_2").send_keys("Kimchi")
    time.sleep(2)
    helperGet("poll_option_3").click()
    helperGet("poll_option_3").send_keys("Mandu")
    time.sleep(2)
    helperGet("poll_option_4").click()
    helperGet("poll_option_4").send_keys("Pringles")
    time.sleep(2)
    helperGet("poll_create").click()

def vote_poll(post_id, option_index):
    helperGet("post_"+str(post_id)+"_option_"+str(option_index)).click()
    helperGet("post_"+str(post_id)+"_vote").click()

def make_friend(test1, test2):
    print("@ prerequsite : test1 and test2 should be friennds")

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

def scenario_1():
    make_friend(test1, test2)

    print("@ scenario: make poll")

    print(">>> make poll from test1's wall")
    ###
    print('... login as test1')
    login(test1, '1234')
    time.sleep(2)

    print("... go to my wall")
    go_to_my_wall()
    time.sleep(2)

    print('...make poll')
    make_poll()

    print('...vote!')
    vote_poll(0, 1)
    time.sleep(2)

    print('... logout')
    log_out()
    time.sleep(2)

    print('... login as test2')
    login(test2, '1234')
    time.sleep(2)

    print("... go to test1's wall")
    search_and_goto_wall(test1)
    time.sleep(2)

    print('...vote!')
    vote_poll(0, 0)
    time.sleep(2)

    print('... all test succeeded')


# get host url
url = urls.host_url()
browser = webdriver.Chrome('/usr/local/bin/chromedriver')
# go to the url
browser.get(url)
browser.maximize_window()

# make two user
usernames = []
for i in range(2):
    usernames.append(make_test_id())

# do signup
print("... do sign up")
for name in usernames:
    print("signup test id: "+name)
    signup(name, '1234')

# test
test1 = usernames[0]
test2 = usernames[1]

scenario_1()

browser.quit()

print("done testing poll functionality")
