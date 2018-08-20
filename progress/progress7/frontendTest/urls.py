remote_host = "https://calendargrams.com/"
local_host = "https://localhost:8444/"
ho_host = "http://52.25.7.185:3000/"

# url = local_host
url = remote_host
# url = ho_host

def host_url():
    return url;

def userlist_url():
    return url+"users/"

def userdetail_url( pk ):
    return url+"users/" + str(pk) + "/"

def login_url():
    return url+"login/"

def posts_url():
    return url+"/posts/"

def update_like_url():
    return url+"posts/like/"

def update_comment_url():
    return url+"comments/"

def get_comment_url(post_id):
    return url+"posts/"+post_id+"/comments/"
