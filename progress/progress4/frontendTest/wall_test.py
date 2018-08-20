import time
from selenium import webdriver
import uuid
import urls
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


def do_navi_bar_click_test(menu, dst):
    helperGet("navi_" + menu).click()
    time.sleep(4)
    # The page should be redirected to login page.
    assert browser.current_url == (url + dst)


def login(username, pwd):
    helperGet('login_page_link').click()

    helperGet('username_field').send_keys(username)
    helperGet('password_field').send_keys(pwd)
    helperGet('login_submit').click()


def post(text):
    helperGet('text').send_keys(text)
    time.sleep(4)
    helperGet('post_btn').click()
    time.sleep(6)


url = urls.host_url()
browser = webdriver.Chrome('/usr/local/bin/chromedriver')

browser.get(url)

print("start: *** wall post write/revise/delete test ***")
usernames = []
userpwds = []

testid = str(uuid.uuid4())
testid = testid[0:7]
username = testid
userpwd = '1234qwer'

usernames.append(username)
userpwds.append(userpwd)


print("... do sign up")

helperGet('signup_page_link').click()

helperGet('username_field').send_keys(username)
helperGet('email_field').send_keys(username + "@test.com")
helperGet('password_field').send_keys(userpwd)
helperGet('password_confirm_field').send_keys(userpwd)
helperGet('signup_submit').click()

print("... do login")

login(usernames[0], userpwds[0])

print("... go to " +usernames[0] +"'s wall")

do_navi_bar_click_test("profile", "wall/" + usernames[0])

print("... post some text")

for i in range(0, 2):
    post('test posting' + str(i))

# delete test start

text_0 = helperGet('post_0_text').text

print("... delete -> click no")

# click delete & click no
helperGet('deleteBtn0').click()
time.sleep(5)
helperGet('no').click()
time.sleep(5)
assert text_0 == helperGet('post_0_text').text


print("... delete -> click yes")

# click delete & click yes
helperGet('deleteBtn0').click()
time.sleep(5)
helperGet('yes').click()
time.sleep(5)
assert text_0 != helperGet('post_0_text').text

# delete test end

# revise test start

print("... revise -> click no")
text_0 = helperGet('post_0_text').text

# click revise & click cancel
helperGet('reviseBtn0').click()
time.sleep(5)
helperGet('cancel').click()
time.sleep(5)

assert text_0 == helperGet('post_0_text').text

print("... revise -> click yes")
# click revise & click confirm
helperGet('reviseBtn0').click()
time.sleep(5)
helperGet('revise_text').send_keys('revised')
time.sleep(5)
helperGet('confirm').click()
time.sleep(10)
assert text_0 != helperGet('post_0_text').text

browser.quit()

print("end: *** wall post write/revise/delete test succeess ***")