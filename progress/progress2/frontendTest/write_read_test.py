import time
from selenium import webdriver;
import urls

username = 'sns_admin'
pwd = '123'

def empty_text_post_test():
    post_0 = browser.find_element_by_id('post_0')
    
    time.sleep(3)
    browser.find_element_by_id('text').send_keys()
    time.sleep(3)
    browser.find_element_by_id('post_btn').click()
    
    assert post_0 == browser.find_element_by_id('post_0')

def text_post_test():
    text = 'auto test posting'
    author = username
    time.sleep(3)
    browser.find_element_by_id('text').send_keys(text)
    time.sleep(3)
    browser.find_element_by_id('post_btn').click()

    time.sleep(2)
    # print ( browser.find_element_by_id('post_0_text').text )
    assert text == browser.find_element_by_id('post_0_text').text
    assert author == browser.find_element_by_id('post_0_author').text


# url = 'http://34.208.93.214:3000/'
url = urls.host_url()
browser = webdriver.Chrome('/usr/local/bin/chromedriver')

browser.get( url )
time.sleep(5)

browser.find_element_by_id( 'login_page_link' ).click()
time.sleep(3)

browser.find_element_by_id( 'username_field' ).send_keys(username)
browser.find_element_by_id( 'password_field' ).send_keys(pwd)
browser.find_element_by_id( 'login_submit' ).click()

time.sleep(6)

print( 'post read & write test start' )
print( 'empty post fail test' )
empty_text_post_test()
print( 'empty post fail success' )
text_post_test()
print( 'post text success' )
print( 'read & write test success' )

browser.quit()
