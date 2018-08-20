import time
import uuid
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
import urls

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
url = urls.host_url();

#to find the latest comment's id in a post
def message_latest():
	message_id = 'text_'
	i = 0
	while True:
		try:
			current = browser.find_element_by_id(message_id + str(i))
			i=i+1
		except NoSuchElementException:
			return i
def find_chatuserlist_id(partner):
	i = 0
	while True:
		try:
			list_id = 'user_'+str(i)
			found = browser.find_element_by_id(list_id)
			if(found.text == partner):
				return list_id
			i=i+1
		except NoSuchElementException:
			return 0
def check_chatting_test(msg, user):
	print("  press Chat button and select the user above")
	chat_button = browser.find_element_by_id('chat');
	chat_button.click()
	time.sleep(3)
	assert browser.current_url == (url+"users")
	print("  talking to user... choose from user list...")
	userlist_id = find_chatuserlist_id(user)
	time.sleep(3)
	browser.find_element_by_id(userlist_id).click()
	time.sleep(3)
	assert browser.current_url == (url+"chat")
	time.sleep(3)
	print("  check if message from another user is on the browser...")
	latest = message_latest()
	assert browser.find_element_by_id('text_'+str(latest-1)).text ==msg
	time.sleep(3)
	print("  check if the message is from another user...")
	time.sleep(3)
	assert browser.find_element_by_id('text_'+str(latest-1)+'_user').text == user
	print("  leave this chatting room...")
	browser.find_element_by_id('chatlater').click()
	time.sleep(3)
	assert browser.current_url == (url+"main_page")
	
def do_chatting_test(user, msg):
	print("  press Chat button...")
	chat_button = browser.find_element_by_id('chat');
	chat_button.click()
	time.sleep(3)
	assert browser.current_url == (url+"users")
	print("  talking to sns_admin.. choose from user list...")
	userlist_id = find_chatuserlist_id('sns_admin')
	time.sleep(3)
	browser.find_element_by_id(userlist_id).click()
	time.sleep(3)
	assert browser.current_url == (url+"chat")
	print("  send message to partner...")
	browser.find_element_by_id('text').send_keys(msg)
	time.sleep(3)
	browser.find_element_by_id('send').click()
	time.sleep(5)
	print("  check if message is on the browser...")
	latest = message_latest()
	time.sleep(3)
	assert browser.find_element_by_id('text_'+str(latest-1)).text ==msg
	time.sleep(3)
	print("  check if the message is from user...")
	assert browser.find_element_by_id('text_'+str(latest-1)+'_user').text == user
	time.sleep(3)
	print("  leave this chatting room...")
	browser.find_element_by_id('chatlater').click()
	time.sleep(3)
	assert browser.current_url == (url+"main_page")


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

def do_login_success_test(user):
    browser.get(url)
    browser.find_element_by_id('login_page_link').click()
    time.sleep(3)

    browser.find_element_by_id('username_field').send_keys(user)
    browser.find_element_by_id('password_field').send_keys('123')
    browser.find_element_by_id('login_submit').click()

    time.sleep(3)

    # The page should contain 'successfully_logged_in' message.
    assert "successfully_logged_in" in browser.find_element_by_id('success').text

def do_logout_test():
	browser.get(url+'main_page/')
	time.sleep(3)
	browser.find_element_by_id('logout').click()
	time.sleep(3)
	assert browser.current_url == (url+'login')
testid = str(uuid.uuid4())
testid = testid[0:7]
testmsg = 'chatting with another user'
print("1. chat test start")
print("2. sign up as a new user")
do_signup_success_test(testid)
print("3. login")
do_login_success_test(testid)
print("4. chatting test starts...")
do_chatting_test(testid, testmsg)
print("5. logout")
do_logout_test()
print("6. login as sns_admin")
do_login_success_test('sns_admin')
print("7. check if the message sent from user is avaiable from sns_admin")
check_chatting_test(testmsg, testid)
print("8. chat test succeeded")
time.sleep(3)
browser.quit()
