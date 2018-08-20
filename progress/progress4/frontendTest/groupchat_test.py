import time
import uuid
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException, TimeoutException
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
import urls

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
url = urls.host_url();

#########################################
#
# util functions
#
#########################################
def helperGet(id, max_delay=10):
    try:
        element = WebDriverWait(browser, max_delay).until(
            EC.presence_of_element_located((By.ID, id))
        )
        return browser.find_element_by_id(id)
    except TimeoutException:
        print("Loading took too much time for id :" + id)

def find_chatuserlist_id(partner):
	i = 0
	while True:
		try:
			list_id = 'user_'+str(i)
			found = helperGet(list_id)
			if(found.text == partner):
				return list_id
			i=i+1
		except NoSuchElementException:
			return 0

def find_grouplist_id(users):
    i = 0
    while True:
        try:
            list_id = 'group_'+str(i)
            found = browser.find_element_by_id(list_id)
            if(found.text == users):
                return list_id
            i=i+1
        except NoSuchElementException:
            return 0

def find_adduserlist_id(user, start_time):
    i=0
    while True:
        try:
            # check if it takes too much time.
            curr_time = time.time()
            if((curr_time - start_time) > 10):
                return 0

            list_id = 'user_'+str(i)
            found = browser.find_element_by_id(list_id)
            if(found.text == user):
                return list_id
            i=i+1
        except NoSuchElementException:
            i=i+1
            pass

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

########################################
#
# do test functions.
#
########################################
def do_signup_success_test(new_username):
    browser.get(url)
    helperGet('signup_page_link').click()

    helperGet('username_field').send_keys(new_username)
    helperGet('email_field').send_keys('zvzvkk@gmail.com')
    helperGet('password_field').send_keys('123')
    helperGet('password_confirm_field').send_keys('123')
    helperGet('signup_submit').click()

    time.sleep(5)
    # after sign up, it should be redirected to Greetings page.
    assert browser.current_url == url

def do_login_success_test(user):
    browser.get(url)
    helperGet('login_page_link').click()

    helperGet('username_field').send_keys(user)
    helperGet('password_field').send_keys('123')
    helperGet('login_submit').click()

    time.sleep(5)

    # The page should contain 'successfully_logged_in' message.
    assert "successfully_logged_in" in helperGet('success').text

def do_chatting_test(user, partner1, partner2, msg):
    print("  press Chat button...")
    chat_button = helperGet('navi_chat')
    chat_button.click()
    time.sleep(5)
    assert browser.current_url == (url+"users")

    print("  group chat button click...")
    helperGet('groupchat').click()

    print("  creating a group chat room with 2 users")
    helperGet('createGroupBtn').click()
    userlist_id1 = find_chatuserlist_id(partner1)
    userlist_id2 = find_chatuserlist_id(partner2)
    helperGet(userlist_id1).click()
    helperGet(userlist_id2).click()
    helperGet('Create').click()
    time.sleep(5)
    users = user + ' ' + partner1 + ' ' + partner2
    grouplist_id = find_grouplist_id(users)
    assert grouplist_id != 0

    print("  entering the created group chat room...")
    helperGet(grouplist_id).click()
    time.sleep(5)
    assert browser.current_url == (url+"groupchat")

    print("  sending a message...")
    helperGet('text').send_keys(msg)
    time.sleep(3)
    helperGet('send').click()
    time.sleep(5)

    print("  check if message is on the browser...")
    latest = message_latest()
    time.sleep(3)
    assert helperGet('text_'+str(latest-1)).text == msg
    time.sleep(3)

    print("  check if the message is from user...")
    assert helperGet('text_'+str(latest-1)+'_user').text == user
    time.sleep(3)

    print("  leave this chatting room...")
    helperGet('chatlater').click()
    time.sleep(5)
    assert browser.current_url == (url+"main_page")


def do_logout_test():
	browser.get(url+'main_page/')
	helperGet('navi_logout').click()
	time.sleep(5)
	assert browser.current_url == (url)

def do_check_chatting_test(msg, prev_user, curr_user, partner):
    print("  press Chat button")
    helperGet('navi_chat').click()
    time.sleep(5)
    assert browser.current_url == (url+"users")

    print("  group chat button click...")
    helperGet('groupchat').click()
    time.sleep(5)

    print("  choose from group list...")
    users = prev_user + ' ' + curr_user + ' ' + partner
    grouplist_id = find_grouplist_id(users)
    assert grouplist_id != 0

    print("  entering the created group chat room...")
    helperGet(grouplist_id).click()
    time.sleep(5)
    assert browser.current_url == (url+"groupchat")
    time.sleep(3)

    print("  check if message from previous user is on the browser...")
    latest = message_latest()
    time.sleep(3)
    assert helperGet('text_'+str(latest-1)).text == msg
    time.sleep(3)

    print("  check if the message is from another user...")
    assert helperGet('text_'+str(latest-1)+'_user').text == prev_user
    time.sleep(3)

    print("  leave this chatting room...")
    helperGet('chatlater').click()
    time.sleep(5)
    assert browser.current_url == (url+"main_page")

def do_add_user_test(user1, user2, user3, new_user):
    print("  press Chat button")
    helperGet('navi_chat').click()
    time.sleep(5)
    assert browser.current_url == (url+"users")

    print("  group chat button click...")
    helperGet('groupchat').click()
    time.sleep(5)

    print("  choose from group list...")
    users = user1 + ' ' + user2 + ' ' + user3
    grouplist_id = find_grouplist_id(users)
    assert grouplist_id != 0

    print("  entering the created group chat room...")
    helperGet(grouplist_id).click()
    time.sleep(5)
    assert browser.current_url == (url+"groupchat")
    time.sleep(3)

    print("  press add more user button")
    helperGet('addUserBtn').click()
    time.sleep(5)

    print("  adding a user")
    start_time = time.time()
    userlist_id = find_adduserlist_id(new_user, start_time)
    helperGet(userlist_id).click()
    helperGet('Add').click()
    time.sleep(5)

    print("  check if the user is added")
    assert new_user in helperGet('chatUsers').text

    print("  leave this chatting room...")
    helperGet('chatlater').click()
    time.sleep(5)
    assert browser.current_url == (url+"main_page")

    print("  press Chat button")
    helperGet('navi_chat').click()
    time.sleep(5)
    assert browser.current_url == (url+"users")

    print("  group chat button click...")
    helperGet('groupchat').click()
    time.sleep(5)

    print("  check if the user added to the user list of the group...")
    users = user1 + ' ' + user2 + ' ' + user3 + ' ' + new_user
    grouplist_id = find_grouplist_id(users)
    assert grouplist_id != 0

    print(" back to timeline...")
    helperGet('navi_timeline').click()

def do_added_user_test(msg, user, partner1, partner2 ,partner3):
    print("  press Chat button")
    helperGet('navi_chat').click()
    time.sleep(5)
    assert browser.current_url == (url+"users")

    print("  group chat button click...")
    helperGet('groupchat').click()
    time.sleep(5)

    print("  choose from group list...")
    users = partner1 + ' ' + partner2 + ' ' + partner3 + ' ' + user
    grouplist_id = find_grouplist_id(users)
    assert grouplist_id != 0

    print("  entering the invited group chat room...")
    helperGet(grouplist_id).click()
    time.sleep(5)
    assert browser.current_url == (url+"groupchat")
    time.sleep(3)

    print("  check if message from previous user is on the browser...")
    latest = message_latest()
    time.sleep(3)
    assert helperGet('text_'+str(latest-1)).text == msg
    time.sleep(3)

    print("  check if the message is from another user...")
    assert helperGet('text_'+str(latest-1)+'_user').text == partner1
    time.sleep(3)

    print("  leave this chatting room...")
    helperGet('chatlater').click()
    time.sleep(5)
    assert browser.current_url == (url+"main_page")

def do_exit_room_test(user, partner1, partner2 ,partner3):
    print("  press Chat button")
    helperGet('navi_chat').click()
    time.sleep(5)
    assert browser.current_url == (url+"users")

    print("  group chat button click...")
    helperGet('groupchat').click()

    print("  choose from group list...")
    users = partner1 + ' ' + partner2 + ' ' + partner3 + ' ' + user
    grouplist_id = find_grouplist_id(users)
    assert grouplist_id != 0

    print("  entering the invited group chat room...")
    helperGet(grouplist_id).click()
    time.sleep(5)
    assert browser.current_url == (url+"groupchat")
    time.sleep(3)

    print("  press exit button")
    helperGet('exit').click()
    time.sleep(5)
    assert browser.current_url == (url+"main_page")

    print("  press Chat button")
    helperGet('navi_chat').click()
    time.sleep(5)
    assert browser.current_url == (url+"users")

    print("  group chat button click...")
    helperGet('groupchat').click()
    time.sleep(5)

    print("  check if now the user cannot enter the room")
    users = partner1 + ' ' + partner2 + ' ' + partner3 + ' ' + user
    grouplist_id = find_grouplist_id(users)
    assert grouplist_id == 0

    print(" back to timeline...")
    helperGet('navi_timeline').click()

def do_exited_room_test(user, partner1, partner2, exited_user):
    print("  press Chat button")
    helperGet('navi_chat').click()
    time.sleep(5)
    assert browser.current_url == (url+"users")

    print("  group chat button click...")
    helperGet('groupchat').click()
    time.sleep(5)

    print("  check if there is no room that contains exited user")
    users = partner1 + ' ' + partner2 + ' ' + user + ' ' + exited_user
    grouplist_id = find_grouplist_id(users)
    assert grouplist_id == 0

    print("  choose from group list...")
    users = partner1 + ' ' + partner2 + ' ' + user
    grouplist_id = find_grouplist_id(users)
    assert grouplist_id != 0

    print("  entering the invited group chat room...")
    helperGet(grouplist_id).click()
    time.sleep(5)
    assert browser.current_url == (url+"groupchat")
    time.sleep(3)

    print("  leave this chatting room...")
    helperGet('chatlater').click()
    time.sleep(5)
    assert browser.current_url == (url+"main_page")

########################################
#
# test codes
#
########################################

testid1 = str(uuid.uuid4())
testid1 = testid1[0:7]
testid2 = str(uuid.uuid4())
testid2 = testid2[0:7]
testid3 = str(uuid.uuid4())
testid3 = testid3[0:7]
testid4 = str(uuid.uuid4())
testid4 = testid4[0:7]

testmsg = 'group chatting with multiple users'

print("1. group chat test start")
print("2. sign up as new users")
do_signup_success_test(testid1)
do_signup_success_test(testid2)
do_signup_success_test(testid3)
do_signup_success_test(testid4)
print("3. login")
do_login_success_test(testid1)
print("4. group chatting test starts...")
do_chatting_test(testid1, testid2, testid3, testmsg)
print("5. logout")
do_logout_test()
print("6. login as another user")
do_login_success_test(testid2)
print("7. check if the message sent from previous user is avaiable to current user")
do_check_chatting_test(testmsg, testid1, testid2, testid3)
print("8. invite another user to the chat room")
do_add_user_test(testid1, testid2, testid3, testid4)
print("9. logout")
do_logout_test()
print("10. login as the invited user")
do_login_success_test(testid4)
print("11. check if the invited user can enter the chat room")
do_added_user_test(testmsg, testid4, testid1, testid2 ,testid3)
print("12. exit the room test")
do_exit_room_test(testid4, testid1, testid2 ,testid3)
print("13. logout")
do_logout_test()
print("14. login as the user who didn't exit the room")
do_login_success_test(testid3)
print("15. check if user list of the group chat room doesn't contain exited user")
do_exited_room_test(testid3, testid1, testid2, testid4)

print("16. group chat test succeeded")
time.sleep(3)
browser.quit()
