import time
import uuid
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import urls

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
url = url = urls.host_url();

def helperGet(id, max_delay=10):
    try:
        element = WebDriverWait(browser, max_delay).until(
            EC.presence_of_element_located((By.ID, id))
        )
        return browser.find_element_by_id(id)
    except TimeoutException:
        print("Loading took too much time for id :" + id)


def do_like_post_test(post_id):
    helperGet("like_post_btn_"+str(post_id)).click()
    helperGet("like_post_" + str(post_id) +"_like").click()

def do_like_comment_test(post_id, comment_id):
    helperGet("comment_toggle_"+str(post_id))
    helperGet("like_comment_btn_"+ "74").click()
    helperGet("like_comment_" + "74" +"_like").click()
    #helperGet("like_comment_" + str(comment_id) +"_like").click()


def do_login_success_test():
    browser.get(url)
    helperGet('login_page_link').click()
    time.sleep(3)

    helperGet('username_field').send_keys('sns_admin')
    helperGet('password_field').send_keys('123')
    helperGet('login_submit').click()

    time.sleep(3)

    # The page should contain 'successfully_logged_in' message.
    assert "successfully_logged_in" in helperGet('success').text


def do_logout_test():
    browser.get(url + 'main_page/')
    time.sleep(2)
    helperGet('logout').click()
    time.sleep(3)

    # The page should be redirected to login page.
    assert browser.current_url == (url + 'login/')


def comment_latest(post_id):
    print('\nhere is comment_latest')
    comment_id = str(post_id) + '_comment_'
    i = 0
    while True:
        try:
            print(comment_id + str(i))
            current = browser.find_element_by_id(comment_id + str(i))
            i = i + 1
        except NoSuchElementException:
            print('comment_latest end\n')
            return i-1


def do_comment_test(post_id):
    comment_toggle = helperGet('comment_toggle_' + str(post_id))
    # print(1)
    comment_area = helperGet(str(post_id) + '_comment')
    # print(2)
    comment_test = 'test comment post'
    # print(3)
    comment_toggle.click()
    # print(4)
    comment_area.send_keys(comment_test)
    # print(5)
    latest = comment_latest(post_id)
    # print( 'latest: ' + str(latest) )
    # print(6)
    helperGet(str(post_id) + '_comment_btn').click()




print("1. like post test start")
print("2. log in")
do_login_success_test()

print("** prerequisite comment write start **")
do_comment_test(130)
print("** prerequisite comment write done **")

print("3. press post like")
do_like_post_test(130)
print("4. press comment like")
do_like_comment_test(130, comment_latest(130))

print("5. like post test succeeded")
