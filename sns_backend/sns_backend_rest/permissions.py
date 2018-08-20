from rest_framework import permissions
from django.contrib.auth.models import User
from sns_backend_rest.models import ChatRoom, GroupChatRoom

# from django.contrib.auth import get_user_model
# from django.conf import settings
# User = get_user_model()
# User = settings.AUTH_USER_MODEL

class LoginListPermission(permissions.BasePermission):
	def has_permission(self, request, view):
		if request.method in ('GET'):
			return request.user in User.objects.filter(username='sns_admin')
		elif request.method in ('POST'):
			return request.user in User.objects.all()
		else:
			return False

class UserListPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        # print(User.objects.all())
        # if request.user in User.objects.filter(username=request.user.username):
        if request.user in User.objects.all():
            return True
        elif request.method  in ('POST'):
            return True
        else:
            return False


class UserDetailPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user in User.objects.filter(username='sns_admin'):
            return True
        else:
            return request.user == obj
            # return request.user.username == obj.username
            # return request.user == User.objects.filter(id=view.kwargs['pk'])

class PostDetailPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user in User.objects.filter(username='sns_admin'):
            return True

        elif request.method in ('GET'):
            return True
        elif request.method in ('PUT'):
            return obj.user == request.user
        elif request.method in ('DELETE'):
            return obj.user == request.user
        return False

#each chatRoom should be available only to users in that room
class ChatRoomPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        room = ChatRoom.objects.get(id=view.kwargs['pk'])
        if request.user in User.objects.filter(username='sns_admin'):
            return True
        return (request.user == room.user1) or (request.user == room.user2)

class GroupChatRoomPermission(permissions.BasePermission):
    def has_permission(self, request, view):
        room = GroupChatRoom.objects.get(id=view.kwargs['pk'])
        admin = User.objects.get(username='sns_admin')
        if request.user == admin:
            return True
        if request.user in room.user.all():
	        return True
        return False

#both below are detail-view

#get and other request - only for users(from/to)
#patch(request accept) - only for user_to
class FriendRequestPermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user in User.objects.filter(username='sns_admin'):
            return True
        if request.method == 'PATCH':
            return request.user in (obj.user_to)
        else:
            return request.user in (obj.user_from, obj.user_to)

class FriendDeletePermission(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.user in User.objects.filter(username='sns_admin'):
            return True
        if request.method == 'PATCH':
            if request.user == obj.user:
                return True
            for friend in obj.friend_list.all():
                print(friend)
                if friend.friend == request.user:
                    return True
            return False
        return request.user ==obj.user
#delete is possible for both users
