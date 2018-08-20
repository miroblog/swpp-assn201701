import time
from selenium import webdriver
import uuid
import urls
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException


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


def go_to_my_calendar():
    do_navi_bar_click_test("calendar")

def log_out():
    do_navi_bar_click_test("logout")
    time.sleep(1)

def login(username, pwd):
    time.sleep(2)
    helperGet('username_field').send_keys(username)
    helperGet('password_field').send_keys(pwd)
    helperGet('login_submit').click()


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

def make_schedule(schedule):
    helperGet("edit").click()
    time.sleep(2)
    helperGet("starttime").click()
    helperGet("starttime").clear()
    helperGet("starttime").send_keys("2017-06-20 17:00")
    time.sleep(2)
    helperGet("endtime").click()
    helperGet("endtime").clear()
    helperGet("endtime").send_keys("2017-06-20 20:00")
    time.sleep(2)
    helperGet("content").click()
    helperGet("content").send_keys(schedule)
    time.sleep(2)
    helperGet("add_schedule").click()
    time.sleep(2)
    browser.switch_to_alert().accept()
    time.sleep(5)
    go_to_my_calendar()

def check_schedule(schedule):
    if helperGet('event_title_0').text == schedule:
        print(' event {0} is on calendar '.format(schedule));
        return 0;
    print('error: cannot find {0}'.format(schedule))

def scenario_1():

    print("@ scenario: make schedules")

    print(">>> make schedule in my calendar page")
    ###
    print('... login as test1')
    login(test1, '1234')
    time.sleep(2)

    print("... go to my calendar")
    go_to_my_calendar()
    time.sleep(2)

    print('... make schedule')
    make_schedule("Project Final Presentation")

    print('... check schedule')
    check_schedule("Project Final Presentation")

    print('... all test succeeded')


# get host url
url = urls.host_url()
browser = webdriver.Chrome('/usr/local/bin/chromedriver')
# go to the url
browser.get(url)
browser.maximize_window()
# make one user
usernames = []
for i in range(1):
    usernames.append(make_test_id())

# do signup
print("... do sign up")
for name in usernames:
    print("signup test id: "+name)
    signup(name, '1234')

# test
test1 = usernames[0]

scenario_1()

browser.quit()

print("done testing adding schedule functionality")
