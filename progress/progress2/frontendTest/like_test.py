import time
import uuid
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import urls

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
url = urls.host_url();


def do_like_test(post_id):

    like_count = browser.find_element_by_id('like_cnt_'+str(post_id))
    like_cnt_before = like_count.text
    like_btn = browser.find_element_by_id('like_'+str(post_id))
    like_btn.click()
    time.sleep(2)
    like_cnt_after = like_count.text
    assert (like_cnt_before != like_cnt_after)

def do_login_success_test():
    browser.get(url)
    time.sleep(3)
    browser.find_element_by_id('login_page_link').click()
    time.sleep(3)

    time.sleep(3)
    browser.find_element_by_id('username_field').send_keys('sns_admin')
    time.sleep(3)
    browser.find_element_by_id('password_field').send_keys('123')
    time.sleep(3)
    browser.find_element_by_id('login_submit').click()

    time.sleep(3)

    # The page should contain 'successfully_logged_in' message.
    assert "successfully_logged_in" in browser.find_element_by_id('success').text


def do_logout_test():
    browser.get(url + 'main_page/')
    time.sleep(2)
    time.sleep(3)
    browser.find_element_by_id('logout').click()
    time.sleep(3)

    # The page should be redirected to login page.
    assert browser.current_url == (url + 'login/')

print("1. like post test start")
print("2. log in")
do_login_success_test()
print("3. press like")
do_like_test(1)
print("4. like post test succeeded")

time.sleep(3)
browser.quit()

