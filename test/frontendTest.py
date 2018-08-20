import time
import uuid
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
#url = 'http://34.208.93.214:3000/'
url = 'http://localhost:3000/'

def do_signup_duplicate_test(new_username):
    browser.get(url)
    browser.find_element_by_id('signup_page_link').click()
    time.sleep(3)
	
    browser.find_element_by_id('username_field').send_keys(new_username)
#check error
    browser.find_element_by_id('username_field').send_keys(Keys.TAB)
    error = "There is already a user with name "+new_username
    assert error in browser.find_element_by_id('username_field_error').text
    browser.find_element_by_id('username_field').send_keys("0")
    browser.find_element_by_id('username_field').send_keys(Keys.TAB)
    browser.find_element_by_id('signup_submit').click()
    error = "Email is invalid"
    assert error in browser.find_element_by_id('email_field_error').text

    browser.find_element_by_id('email_field').send_keys('zvzvkk')
    browser.find_element_by_id('email_field').send_keys('@gmail.com')
    browser.find_element_by_id('signup_submit').click()
    error = "This field is required"
    assert error in browser.find_element_by_id('password_field_error').text

    browser.find_element_by_id('password_field').send_keys('123')
    browser.find_element_by_id('password_confirm_field').send_keys('12')
    browser.find_element_by_id('signup_submit').click()
    error = "Passwords must match";
    assert error in browser.find_element_by_id('password_confirm_field_error').text
    browser.find_element_by_id('signup_submit').click()

    browser.find_element_by_id('password_confirm_field').send_keys('3')
    browser.find_element_by_id('signup_submit').click()

    time.sleep(3)
 # after sign up, it should be redirected to Greetings page.
    assert browser.current_url == url



def do_signup_success_test(new_username):
    browser.get(url)
    browser.find_element_by_id('signup_page_link').click()
    time.sleep(3)

    browser.find_element_by_id('username_field').send_keys(new_username)
    browser.find_element_by_id('email_field').send_keys('zvzvkk@gmail.com')
    browser.find_element_by_id('password_field').send_keys('123')
    browser.find_element_by_id('password_confirm_field').send_keys('123')
    browser.find_element_by_id('signup_submit').click()

    time.sleep(3)
    # after sign up, it should be redirected to Greetings page.
    assert browser.current_url == url

def from_login_page_to_signup_page_link():
    browser.get(url)
    browser.find_element_by_id('login_page_link').click()
    time.sleep(3)

    # move from login to sign up
    browser.find_element_by_id('signup_page_link').click()
    time.sleep(3)
    # checking if the page is sign up page.
    assert browser.current_url == (url + 'signup')

def do_login_failure_test():
    browser.get(url)
    browser.find_element_by_id('login_page_link').click()
    time.sleep(3)
    browser.find_element_by_id('login_submit').click()
    error = "This field is required"
    assert error in browser.find_element_by_id('username_field_error').text

    time.sleep(5)


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

def do_logged_in_refresh_test():
    browser.get(url)
    browser.find_element_by_id('login_page_link').click()
    time.sleep(3)

    # When the user is already logged in, the page should be redirected to main page with success message.
    assert "successfully_logged_in" in browser.find_element_by_id('success').text

def do_logout_test():
    browser.get(url + 'main_page/')
    time.sleep(2)
    browser.find_element_by_id('logout').click()
    time.sleep(4)

    # The page should be redirected to login page.
    assert browser.current_url == (url + 'login')

testid = str(uuid.uuid4());
testid = testid[0:7]
do_signup_success_test(testid)
do_signup_duplicate_test(testid)
from_login_page_to_signup_page_link()

do_login_failure_test()
do_login_success_test()
do_logout_test()
