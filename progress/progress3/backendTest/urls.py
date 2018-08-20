remote_host = "http://34.208.93.214:8000/"
local_host = "http://localhost:8000/"
ho_host = "http://52.25.7.185:7000/"

# url = remote_host
url = local_host
# url = ho_host

def userlist_url():
    return url+"users/"

def userdetail_url( pk ):
    return url+"users/" + str(pk) + "/"

def login_url():
    return url+"login/"

def posts_url():
    return url+"posts/"

def update_like_post_url():
    return url+"posts/like/"

def update_like_comment_url():
    return url+"comments/like/"

def update_comment_url():
    return url+"comments/"

def get_comment_url(post_id):
    return url+"posts/"+post_id+"/comments/"

def postdetail_url( pk ):
    return url+"posts/" + str(pk) + "/" 

def chatroomlist_url():
    return url+"rooms/"

def chatroomdetail_url( pk ):
    return url+ "rooms/" + str(pk) + "/history/"
