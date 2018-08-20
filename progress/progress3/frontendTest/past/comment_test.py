import time
import uuid
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import urls

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
url = urls.host_url();
#to find the latest comment's id in a post
def comment_latest(post_id):
    print( '\nhere is comment_latest' )
    comment_id = str(post_id)+'_comment_'
    i = 0
    while True:
        try:
            print( comment_id + str(i) )
            current = browser.find_element_by_id(comment_id + str(i))
            i=i+1
        except NoSuchElementException:
            print('comment_latest end\n')
            return i
	

def do_comment_test(post_id):
    comment_toggle = browser.find_element_by_id('comment_toggle_' + str(post_id))
    # print(1)
    comment_area = browser.find_element_by_id(str(post_id)+'_comment')
    # print(2)
    comment_test = 'test comment post'
    # print(3)
    comment_toggle.click()
    time.sleep(5)
    # print(4)
    comment_area.send_keys(comment_test)
    # print(5)
    latest = comment_latest(post_id)
    # print( 'latest: ' + str(latest) )
    # print(6)
    browser.find_element_by_id(str(post_id)+'_comment_btn').click()
    # print(7)
    time.sleep(4)
    # print(8)
    check_comment = browser.find_element_by_id(str(post_id)+'_comment_'+str(latest)).text
    # print( check_comment )
    # print(9)
    assert comment_test in check_comment

def do_login_success_test():
    browser.get(url)
    time.sleep(5)
    browser.find_element_by_id('login_page_link').click()
    time.sleep(3)

    browser.find_element_by_id('username_field').send_keys('sns_admin')
    browser.find_element_by_id('password_field').send_keys('123')
    browser.find_element_by_id('login_submit').click()

    time.sleep(3)

    # The page should contain 'successfully_logged_in' message.
    assert "successfully_logged_in" in browser.find_element_by_id('success').text


print("1. comment post test start")
print("2. log in")
do_login_success_test()
print("3. press comment toggle and leave comment")
do_comment_test(1)
print("4. comment post test succeeded")

time.sleep(3)
browser.quit()

