remote_host = "http://34.208.93.214:8000/"
local_host = "http://localhost:8000/"

#url = local_host
url = remote_host

def userlist_url():
    #return "http://34.208.93.214:8000/users/"
    return url+"users/"

def userdetail_url( pk ):
    #return "http://34.208.93.214:8000/users/" + str(pk) + "/"
    return url+"users/" + str(pk) + "/"

def login_url():
    #return "http://34.208.93.214:8000/login/"
    return url+"login/"

def posts_url():
    #return "http://34.208.93.214:8000/posts/"
    return url+"posts/"

def update_like_url():
    return url+"posts/like/"

def update_comment_url():
    return url+"comments/"

def get_comment_url(post_id):
    return url+"posts/"+post_id+"/comments/"
