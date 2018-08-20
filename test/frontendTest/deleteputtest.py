import time
from selenium import webdriver;
import urls

def login( username, pwd ):
    browser.find_element_by_id( 'login_page_link' ).click()
    time.sleep(3)

    browser.find_element_by_id( 'username_field' ).send_keys(username)
    browser.find_element_by_id( 'password_field' ).send_keys(pwd)
    browser.find_element_by_id( 'login_submit' ).click()
    time.sleep(3)

def post(text):
    browser.find_element_by_id('text').send_keys(text)
    browser.find_element_by_id('post_btn').click()
    time.sleep(3)


url = urls.host_url()
browser = webdriver.Chrome('/usr/local/bin/chromedriver')

browser.get(url)
time.sleep(5)

usernames = []
userpwds = []

for i in range(1000, 1002):
    username = 'test' + str(i)
    userpwd = '1234qwer'

    usernames.append(username)
    userpwds.append(userpwd)

    browser.find_element_by_id( 'signup_page_link' ).click()
    time.sleep(3)

    browser.find_element_by_id( 'username_field' ).send_keys(username)
    browser.find_element_by_id( 'email_field' ).send_keys(username+"@test.com")
    browser.find_element_by_id( 'password_field' ).send_keys(userpwd)
    browser.find_element_by_id( 'password_confirm_field' ).send_keys(userpwd)
    browser.find_element_by_id( 'signup_submit' ).click()
    time.sleep(3)

login( usernames[0], userpwds[0] )

for i in range(0, 2):
    post('test posting' + str(i))

# delete test start

text_0 = browser.find_element_by_id('post_0_text').text

# click delete & click no
browser.find_element_by_id( 'deleteBtn0' ).click()
time.sleep(2)
browser.find_element_by_id( 'no' ).click()
time.sleep(3)
assert text_0 == browser.find_element_by_id('post_0_text').text

# click delete & click yes
browser.find_element_by_id( 'deleteBtn0' ).click()
time.sleep(2)
browser.find_element_by_id( 'yes' ).click()
time.sleep(5)
assert text_0 != browser.find_element_by_id('post_0_text').text

# delete test end

# revise test start

text_0 = browser.find_element_by_id( 'post_0_text' ).text

# click revise & click cancel
browser.find_element_by_id( 'reviseBtn0' ).click()
time.sleep(2)
browser.find_element_by_id( 'cancel' ).click()
time.sleep(3)

assert text_0 == browser.find_element_by_id('post_0_text').text

# click revise & click confirm
browser.find_element_by_id( 'reviseBtn0' ).click()
time.sleep(2)
browser.find_element_by_id( 'revise_text' ).send_keys( 'revised' )
time.sleep(2)
browser.find_element_by_id( 'confirm' ).click()
time.sleep(3)
assert text_0 != browser.find_element_by_id('post_0_text').text

browser.quit()



