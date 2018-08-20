import time
from selenium import webdriver
import uuid
import urls
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import os

def helperGet(id, max_delay=10):
    try:
        element = WebDriverWait(browser, max_delay).until(
                EC.presence_of_element_located((By.ID, id))
                )
        return browser.find_element_by_id(id)
    except TimeoutException:
        print("Loading took too much time for id :" + id)

def login( username, pwd ):
    helperGet( 'login_page_link' ).click()
    helperGet( 'username_field' ).send_keys(username)
    helperGet( 'password_field' ).send_keys(pwd)
    helperGet( 'login_submit' ).click()

def signup(username, userpwd):
    helperGet('signup_page_link').click()
    helperGet('username_field').send_keys(username)
    helperGet('email_field').send_keys(username + "@test.com")
    helperGet('password_field').send_keys(userpwd)
    helperGet('password_confirm_field').send_keys(userpwd)
    helperGet('signup_submit').click()

def search_user(username):
    helperGet('search_bar').send_keys(username[0:4])
    helperGet('search_btn').click()
    time.sleep(2)
    find = False
    for i in range(30):
        if helperGet('search_result_user'+str(i)).text == username:
            find = True
            break
    
    if not find:
        print( 'error: cannot find user {0}'.format(username) )

    helperGet('search_result_ok_btn').click()
    helperGet('search_bar').clear()

def search_and_goto_wall(username):
    helperGet('search_bar').send_keys(username[0:4])
    helperGet('search_btn').click()
    time.sleep(2)
    find = False
    searchnum = 0
    for i in range(30):
        if helperGet('search_result_user'+str(i)).text == username:
            searchnum = i
            find = True
            break
    
    if not find:
        print( 'error: cannot find user {0}'.format(username) )
        exit(1)
    
    helperGet('search_result_user'+str(searchnum)).click()
    assert helperGet('wall_title').text == 'This is '+ username + '\'s wall'
    


url = urls.host_url()
browser = webdriver.Chrome('/usr/local/bin/chromedriver')

browser.get(url)

test_users = []
for i in range(5):
    testid = str( uuid.uuid4() )
    testid = testid[0:7]
    username = testid
    userpwd = '1234qwer'
    signup(username, userpwd)
    test_users.append(username)

time.sleep(5)

login( test_users[0], '1234qwer')

for i in range(5):
    search_user(test_users[i])

search_and_goto_wall(test_users[1]);

browser.quit()
