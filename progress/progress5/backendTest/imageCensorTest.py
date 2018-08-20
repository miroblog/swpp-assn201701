from time import sleep
from random import randint
import requests
import utils
import urls
import json

def post_image_success( auth ):
    url = urls.userphoto_url()

    images = []
    for i in range(10):
        image = { 'photo': open('./test_images/safe_image' + str(i+1) + '.JPG', 'rb') }
        images.append(image)

    for image in images:
        res = requests.post( url, files=image, auth=auth )

        if res.status_code != 200:
            print('post profile image success fail')
            exit(1)

        print( 'post profile image success' )

def post_image_fail( auth ):
    url = urls.userphoto_url()

    images = []
    for i in range(10):
        image = { 'photo': open('./test_images/unsafe_image' + str(i+1) + '.JPG', 'rb') }
        images.append(image)

    for image in images:
        res = requests.post( url, files=image, auth=auth )

        if res.status_code != 403:
            print('unsafe image censor fail')
            exit(1)

        print( 'censored unsafe image: probability of ' + str(res.json()['probability']) )

def do_image_censor_test():
    # create test user
    print ("1. create a user: test0")
    test_user = ( 'test0', 'test0@test.com', '1234qwer' )
    utils.delete_user(test_user[0])
    utils.sign_up_success( test_user[0], test_user[1], test_user[2] )

    # image censor test
    print ("\n2. test setting profile image success with safe images.")
    post_image_success( (test_user[0], test_user[2]) )
    print ("\n3. test banning profile image with unsafe images.")
    post_image_fail( (test_user[0], test_user[2]) )

    print('image censor test success')


do_image_censor_test()
