import time
import uuid
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
import urls

browser = webdriver.Chrome('/usr/local/bin/chromedriver')
url = url = urls.host_url();

def helperGet(id, max_delay=10):
    try:
        element = WebDriverWait(browser, max_delay).until(
            EC.presence_of_element_located((By.ID, id))
        )
        return browser.find_element_by_id(id)
    except TimeoutException:
        print("Loading took too much time for id :" + id)

def do_navi_bar_click_test(menu, dst):
    helperGet("navi_"+menu).click()
    time.sleep(4)
    # The page should be redirected to login page.
    assert browser.current_url == (url + dst)

def do_login_success_test():
    browser.get(url)
    helperGet('login_page_link').click()
    time.sleep(3)

    helperGet('username_field').send_keys('sns_admin')
    helperGet('password_field').send_keys('123')
    helperGet('login_submit').click()

    time.sleep(3)
    # The page should contain 'successfully_logged_in' message.
    assert "successfully_logged_in" in helperGet('success').text




print("start : *** navigation bar test ***")
browser.get(url)
print("... navibar signup click")
do_navi_bar_click_test("signup", "signup")
time.sleep(1)

print("... navibar login click")
do_navi_bar_click_test("login", "login")
time.sleep(1)

print("... do login")
do_login_success_test()
time.sleep(1)

print("... navibar timeline click")
do_navi_bar_click_test("timeline", "main_page")
time.sleep(1)

print("... navibar chat click")
do_navi_bar_click_test("chat", "users")
time.sleep(1)

print("... navibar settings click")
do_navi_bar_click_test("settings", "settings")
time.sleep(1)

print("... navibar profile click")
do_navi_bar_click_test("profile", "wall/sns_admin")
time.sleep(1)

print("... navibar logout click")
do_navi_bar_click_test("logout", "")
time.sleep(1)

print("end : *** navigation bar test  succeeded ***")
browser.quit()
