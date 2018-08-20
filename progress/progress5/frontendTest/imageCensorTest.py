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

url = urls.host_url()
browser = webdriver.Chrome('/usr/local/bin/chromedriver')

browser.get(url)

print ("1. signup a user\n")
testid = str( uuid.uuid4() )
testid = testid[0:7]
username = testid
userpwd = '1234qwer'

helperGet( 'signup_page_link' ).click()
helperGet( 'username_field' ).send_keys( username )
helperGet( 'email_field' ).send_keys( username+"@test.com" )
helperGet( 'password_field' ).send_keys( userpwd )
helperGet( 'password_confirm_field' ).send_keys( userpwd )
helperGet( 'signup_submit' ).click()

print("2. login as a user\n")
login( username, userpwd )

helperGet( 'navi_settings' ).click()

#image upload test
print("3. setting profile photo with safe images")
for i in range(10):
    helperGet( 'photo_input' ).send_keys( os.getcwd() + "/test_images/safe_image" + str(i+1) + ".JPG" )
    helperGet( 'photo_submit' ).click()
    time.sleep(10)
    print('photo upload success')
    assert helperGet( 'photo_result' ).text == 'photo Upload Success'
print("     success\n")

print("4. trying setting profile photo with not safe images")
for i in range(10):
    helperGet( 'photo_input' ).send_keys( os.getcwd() + "/test_images/unsafe_image" + str(i+1) + ".JPG" )
    helperGet( 'photo_submit' ).click()
    time.sleep(10)

    assert helperGet( 'nsfwPopupText' ).text == 'Not Safe for Work Image Detected.'
    print('unsafe image detected - ' + helperGet('probability').text)
    helperGet( 'Confirm' ).click()
print("     success\n")

print("all test succeded")
browser.quit()
