import time
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
url = 'http://34.208.93.214:3000/'
browser.get(url)

# sign up test
browser.find_element_by_id('signup_page_link').click()
time.sleep(3)

browser.find_element_by_id('username_field').send_keys('test6')
browser.find_element_by_id('email_field').send_keys('zvzvkk@gmail.com')
browser.find_element_by_id('password_field').send_keys('123')
browser.find_element_by_id('password_confirm_field').send_keys('123')
browser.find_element_by_id('signup_submit').click()

time.sleep(3)
# after sign up, it should be redirected to Greetings page.
assert browser.current_url == url

# login test
browser.find_element_by_id('login_page_link').click()
time.sleep(3)

# move from login to sign up
browser.find_element_by_id('signup_page_link').click()
time.sleep(3)
# checking if the page is sign up page.
assert browser.current_url == (url + 'signup')

# again, login test
browser.get(url)
browser.find_element_by_id('login_page_link').click()
time.sleep(3)

browser.find_element_by_id('username_field').send_keys('test6')
browser.find_element_by_id('password_field').send_keys('123')
browser.find_element_by_id('login_submit').click()

time.sleep(3)

# The page should contain 'successfully_logged_in' message.
assert "successfully_logged_in" in browser.find_element_by_id('success').text

browser.quit()
