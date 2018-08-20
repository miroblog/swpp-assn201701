import time
import uuid
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
# url = 'http://34.208.93.214:3000/'
url = 'http://localhost:3000/'

#after leaving comments, this code doesn't know the id of the component, so it searches the recent comment and check if comment is left well or not 

def comment_test(post_id):
	browser.find_element_by_id('toggle_comment_'+str(post_id)).click@@@@
    browser.find_element_by_id(str(post_id)+'_comment_'
    like_count = browser.find_element_by_id('like_cnt_'+str(post_id))
    like_cnt_before = like_count.text
    like_btn = browser.find_element_by_id('like_'+str(post_id))
    like_btn.click()
    time.sleep(2)
    like_cnt_after = like_count.text
    assert (like_cnt_before != like_cnt_after)

def do_login_success_test():
    browser.get(url)
    browser.find_element_by_id('login_page_link').click()
    time.sleep(3)

    browser.find_element_by_id('username_field').send_keys('sns_admin')
    browser.find_element_by_id('password_field').send_keys('123')
    browser.find_element_by_id('login_submit').click()

    time.sleep(3)

    # The page should contain 'successfully_logged_in' message.
    assert "successfully_logged_in" in browser.find_element_by_id('success').text



do_login_success_test()
do_comment_test(1)
