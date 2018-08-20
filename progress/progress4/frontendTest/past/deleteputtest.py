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
    

def post(text):
    helperGet('text').send_keys(text)
    time.sleep(4) 
    helperGet('post_btn').click()
    time.sleep(6) 
    


url = urls.host_url()
browser = webdriver.Chrome('/usr/local/bin/chromedriver')

browser.get(url)


usernames = []
userpwds = []

for i in range(1000, 1002):
    testid = str(uuid.uuid4())
    testid = testid[0:7]
    username = testid
    userpwd = '1234qwer'

    usernames.append(username)
    userpwds.append(userpwd)

    helperGet( 'signup_page_link' ).click()
    

    helperGet( 'username_field' ).send_keys(username)
    helperGet( 'email_field' ).send_keys(username+"@test.com")
    helperGet( 'password_field' ).send_keys(userpwd)
    helperGet( 'password_confirm_field' ).send_keys(userpwd)
    helperGet( 'signup_submit' ).click()
    

login( usernames[0], userpwds[0] )

for i in range(0, 2):
    post('test posting' + str(i))

# delete test start

text_0 = helperGet('post_0_text').text

# click delete & click no
helperGet( 'deleteBtn0' ).click()
time.sleep(5)
helperGet( 'no' ).click()
time.sleep(5)
assert text_0 == helperGet('post_0_text').text

# click delete & click yes
helperGet( 'deleteBtn0' ).click()
time.sleep(5)
helperGet( 'yes' ).click()
time.sleep(5)
assert text_0 != helperGet('post_0_text').text

# delete test end

# revise test start

text_0 = helperGet( 'post_0_text' ).text

# click revise & click cancel
helperGet( 'reviseBtn0' ).click()
time.sleep(5)
helperGet( 'cancel' ).click()
time.sleep(5)

assert text_0 == helperGet('post_0_text').text

# click revise & click confirm
helperGet( 'reviseBtn0' ).click()
time.sleep(5)
helperGet( 'revise_text' ).send_keys( 'revised' )
time.sleep(5)
helperGet( 'confirm' ).click()
time.sleep(10)
assert text_0 != helperGet('post_0_text').text

browser.quit()


