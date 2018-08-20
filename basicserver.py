
import requests
from time import sleep
import urls
import json
import base64

data = { 'username': 'sns_admin',
            'email': 'asdf@gmail.com',
            'password': '123'}
res = requests.post( urls.userlist_url(), data )
auth = ('sns_admin', '123')
data = {
        'text': 'test'
}
res = requests.post( urls.posts_url(), data, auth=auth )
comment = 'testing comment'
data = {'post': 1, 'comment': comment}
res = requests.post(urls.update_comment_url(), data, auth=auth)
