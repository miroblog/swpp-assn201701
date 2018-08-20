from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User
from sns_backend_rest.models import Post, Comment, Wall, FriendRequest, MyFriend, UsersForFriend, Poll, Option
# Register your models here.

# admin.site.register(User, UserAdmin)
admin.site.register(Comment)
admin.site.register(Post)
admin.site.register(Wall)
admin.site.register(FriendRequest)
admin.site.register(MyFriend)
admin.site.register(UsersForFriend)
admin.site.register(Option)
admin.site.register(Poll)