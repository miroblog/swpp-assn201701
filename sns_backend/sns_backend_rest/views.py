from django.shortcuts import render
import copy
# Create your views here.

from sns_backend_rest.models import Login, Post, Comment, ChatRoom, ChatMessage, LikeComment, LikePost, GroupChatRoom, GroupChatMessage, UserPhoto, Wall, MyFriend, Poll, Option, Schedule, ShareSchedule
from rest_framework import generics
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import exceptions, status
from rest_framework import permissions
from sns_backend_rest.serializers import UserSerializer, LoginSerializer, PostSerializer, CommentSerializer, \
    ChatRoomSerializer, ChatMessageSerializer, \
	GroupChatRoomSerializer, GroupChatMessageSerializer, UserPhotoSerializer, WallSerializer, \
        UserEmailSerializer, ChangePasswordSerializer, PollSerializer, ScheduleSerializer, ShareScheduleSerializer
from sns_backend_rest.permissions import UserListPermission, UserDetailPermission, LoginListPermission, \
    PostDetailPermission, ChatRoomPermission, GroupChatRoomPermission
from rest_framework.views import APIView
from rest_framework.parsers import FileUploadParser, MultiPartParser, FormParser, JSONParser
from django.http import Http404
# from django.contrib.auth import get_user_model
# User = get_user_model()

from sns_backend_rest.nsfw.nsfwDetection import nsfwDetection
import json
import datetime

# sample backend
class VotePoll(APIView):
    # vote poll requires, option id
    def post(self, request, format=None):
        # passed data is of json format
        data = request.data.copy()
        option = Option.objects.get(id=data['option_id'])
        poll = Poll.objects.get(id=data['poll_id'])
        option.vote = option.vote + 1;
        option.save()
        poll.voters.add(request.user)
        poll.save()
        return Response(status=status.HTTP_200_OK)

# GET/POST - wall

class WallList(APIView):
    def get(self, request, name, format=None):
        isFriend = checkFriend(request, name)
        if not isFriend:
            queryset = []
            serializer = PostSerializer( queryset, many=True )
            return Response(serializer.data, status=status.HTTP_403_FORBIDDEN)

        owner = User.objects.get(username = name)
        wall, created = Wall.objects.get_or_create(owner=owner)
        serializer = PostSerializer(wall.posts, many=True)
        # print(serializer.data)
        return Response(serializer.data)

    def post(self, request,name, format=None):
        isFriend = checkFriend(request, name)
        if not isFriend:
            return Response(status=status.HTTP_403_FORBIDDEN)
        data = request.data.copy()
        # get wall object
        writer = User.objects.get(username = name)
        # create post
        wallPost = Post(user = request.user)
        if 'text' in data:
            wallPost.text = data['text']
        if 'image' in data:
            wallPost.image = data['image']
        if 'poll_data' in data:
            json_str_data = data['poll_data']
            # create dict from json string
            data = json.loads(json_str_data)
            print(data)
            # first create question from data
            question = data['question']
            poll = Poll.objects.create(user=request.user, question=question)
            options = data['options']
            # add options to poll object
            for option in options:
                # create options
                opt = Option(text=option)
                opt.save()
                # add option
                poll.options.add(opt)
            poll.save()
            wallPost.poll = poll;
        wallPost.save()
        wall = Wall.objects.get(owner=writer)
        wall.posts.add(wallPost)
        return Response(status=status.HTTP_200_OK)

def checkFriend(request, name):
    # check request user has name as friend
    MyFriend.objects.get_or_create(user=request.user)
    friend_list = MyFriend.objects.get(user=request.user).friend_list.all()
    isFriend = False
    for friend in friend_list:
        if friend.friend.username == name:
            isFriend = True
            break

    # if request user is owner
    if request.user.username == name:
        isFriend = True

    return isFriend



class UserList(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (UserListPermission,)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (UserDetailPermission,)

class UserEmailDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserEmailSerializer
    permission_classes = (UserDetailPermission,)

    def put(self, request, pk, format=None):
        user = User.objects.get(id=pk)
        serializer = UserEmailSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response( serializer.data, status=status.HTTP_200_OK )
        return Response( serializer.errors, status=status.HTTP_400_BAD_REQUEST )

class UserChangePasswordDetail(APIView):
    permission_classes = ( UserDetailPermission, )

    def get_object(self, queryset=None):
        return self.request.user

    def put(self, request, *args, **kwargs):
        self.object = self.get_object()
        print(self.object)
        serializer = ChangePasswordSerializer(data=request.data)

        if serializer.is_valid():
            old_password = serializer.data.get("old_password")
            print(old_password)
            if not self.object.check_password(old_password):
                return Response({"old_password": ["Wrong password."]}, status = status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserPhotoList(generics.ListCreateAPIView):
    queryset = UserPhoto.objects.all()
    serializer_class = UserPhotoSerializer
    permission_classes = (UserListPermission,)
    parser_classes = (MultiPartParser, FormParser, JSONParser )
    nsfwModel = nsfwDetection()

    def post(self, request, format=None):
        photo, created = UserPhoto.objects.get_or_create(
                user=request.user
                )

        isSafe, probability = self.nsfwModel.predict(request.data['photo'])

        if(isSafe):
            if created:
                photo.photo = request.data['photo']
                photo.save()
            else:
                photo.photo = request.data['photo']
                photo.save()
            return Response(status=status.HTTP_200_OK)
        else:
            data = {'probability': probability}
            return Response(data, status=status.HTTP_403_FORBIDDEN)

class UserPhotoDetail(generics.RetrieveDestroyAPIView):
    queryset = UserPhoto.objects.all()
    serializer_class = UserPhotoSerializer
    permission_classes = (UserDetailPermission,)
    parser_classes = (MultiPartParser, FileUploadParser, FormParser, )

class LoginList(generics.ListCreateAPIView):
    queryset = Login.objects.all()
    serializer_class = LoginSerializer
    permission_classes = (LoginListPermission,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = {permissions.IsAuthenticated, }

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class CommentDetail(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = {permissions.IsAuthenticated, }

    def get_queryset(self):
        post = self.kwargs['pk']
        return Comment.objects.filter(post=post)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class PostList(generics.ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated,)
    parser_classes = (MultiPartParser, FormParser, JSONParser )

    def post(self, request, format=None):
        data = request.data.copy()
        wallPost = Post(user = request.user)
        if 'text' in data:
            wallPost.text = data['text']
        if 'image' in data:
            wallPost.image = data['image']
        if 'poll_data' in data:
            json_str_data = data['poll_data']
            # create dict from json string
            data = json.loads(json_str_data)
            print(data)
            # first create question from data
            question = data['question']
            poll = Poll.objects.create(user=request.user, question=question)
            options = data['options']
            # add options to poll object
            for option in options:
                # create options
                opt = Option(text=option)
                opt.save()
                # add option
                poll.options.add(opt)
            poll.save()
            wallPost.poll = poll;
        wallPost.save()

        wall = Wall.objects.get(owner = request.user)
        wall.posts.add(wallPost)

        return Response(status=status.HTTP_200_OK)

    # def perform_create(self, serializer):
        # serializer.save(user=self.request.user)

    def get(self, request, format=None):
        queryset = []
        posts = Post.objects.all()

        MyFriend.objects.get_or_create(user=self.request.user)
        friend_list = MyFriend.objects.get(user=self.request.user).friend_list.all()
        print(friend_list)

        for post in posts:
            for friend in friend_list:
                if (friend.friend.username == post.user.username):
                    queryset.append(post)
                    break
            if request.user == post.user:
                queryset.append(post)
        serializer = PostSerializer( queryset, many=True )
        return Response(serializer.data)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated, PostDetailPermission,)
    def put(self, request, pk, format=None):
        print('here is put')
        post = Post.objects.get(id=pk)
        print(post.text)
        print( request.data['text'] )
        post.text = request.data['text']
        print(post.text)
        post.save()
        return Response( status=status.HTTP_200_OK )

class UserExists(APIView):
    def post(self, request, format=None):
        data = request.data.copy()
        try:
            user = User.objects.get(username=data['username'])
        except User.DoesNotExist:
            return Response(status=status.HTTP_204_NO_CONTENT)
        return Response(status=status.HTTP_200_OK)


class ChatRoomList(generics.ListCreateAPIView):
    queryset = ChatRoom.objects.all()
    serializer_class = ChatRoomSerializer
    permission_classes = {permissions.IsAuthenticated, }

    def post(self, request, format=None):
        data = request.data.copy()
        serializer = ChatRoomSerializer(data=data)
        if (serializer.is_valid()):
            user2 = User.objects.get(username=data['user2'])
            serializer.save(user1=self.request.user, user2=user2)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_404_NOT_FOUND)


class ChatRoomDetail(generics.ListCreateAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = {permissions.IsAuthenticated, ChatRoomPermission}

    def get_queryset(self):
        room = self.kwargs['pk']
        return ChatMessage.objects.filter(room=room)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UpdateLikePost(APIView):
    def post(self, request, format=None):
        data = request.data.copy()
        try:
            post = Post.objects.get(id=data['id'])
            like, created = LikePost.objects.get_or_create(post_id=post, by=request.user)
            if (created == True):
                print("created")
                like.emoji = data['emoji']
                like.save()
                post.like_list.add(like)
            else:
                print("not created")
                if (like.emoji == data['emoji']):
                    like.delete()
                    post.like_list.remove(like)
                else:
                    like.emoji = data['emoji']
                    like.save()
            post.save()
        except Post.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)


class UpdateLikeComment(APIView):
    def post(self, request, format=None):
        data = request.data.copy()
        try:
            comment = Comment.objects.get(id=data['id'])
            like, created = LikeComment.objects.get_or_create(comment_id=comment, by=request.user)
            if (created == True):
                like.emoji = data['emoji']
                like.save()
                comment.like_list.add(like)
            else:
                if (like.emoji == data['emoji']):
                    like.delete()
                    comment.like_list.remove(like)
                else:
                    like.emoji = data['emoji']
                    like.save()
            comment.save()
        except Comment.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK)

class GroupChatRoomList(generics.ListCreateAPIView):
    serializer_class = GroupChatRoomSerializer
    permission_classes = {permissions.IsAuthenticated, }
#user addition and create room is different style of post
#create room : without room id
#user addtion : with room id
    def post(self, request, format=None):
        data = request.data.copy()
        print(data)
        if 'delete' in request.POST:
            deleteflag = 0
            room = GroupChatRoom.objects.get(id=data['roomid'])
            for user in room.user.all():
                if user == request.user:
                    room.user.remove(user)
                    deleteflag = 1
                    break
            room.save()
            if(deleteflag):
                return Response(status=status.HTTP_202_ACCEPTED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            createdflag = 0
            if 'roomid' in request.POST:
                room = GroupChatRoom.objects.get(id=data['roomid'])
                createdflag = 1
            else:
                room = GroupChatRoom.objects.create()
            i = 1
            usern = 'user'+str(i)
            users = []
            users.append(request.user)
            while (i <= len(data)-createdflag):
                users.append( User.objects.get(username=data[usern]))
                i = i+1
                usern = 'user'+str(i)
            for user in users:
                room.user.add(user)
                room.save()
            if createdflag==0:
                return Response({}, status=status.HTTP_201_CREATED)
            return Response({}, status=status.HTTP_200_OK)
    def get_queryset(self):
        Rooms = GroupChatRoom.objects.all()
        queryset = []
        getusername = self.request.user.username
        for room in Rooms:
            if (getusername == 'sns_admin') and (room.user.count()>0):
                queryset.append(room)
            for user in room.user.all():
                if getusername == user.username:
                   queryset.append(room)
        return queryset

class GroupChatRoomDetail(generics.ListCreateAPIView):
    serializer_class = GroupChatMessageSerializer
    permission_classes = {permissions.IsAuthenticated, GroupChatRoomPermission}

    def get_queryset(self):
        room = self.kwargs['pk']
        return GroupChatMessage.objects.filter(room=room)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

from sns_backend_rest.serializers import FriendRequestSerializer, FriendSerializer, FriendUserListSerializer
from sns_backend_rest.models import FriendRequest, UsersForFriend, MyFriend
from sns_backend_rest.permissions import FriendRequestPermission, FriendDeletePermission
class FriendRequestList(generics.ListCreateAPIView):
    serializer_class = FriendRequestSerializer
#get only returns object with its ID, post needs only to have auth
#no specific permission needed
    permission_classes ={permissions.IsAuthenticated }
    def post(self, request, format=None):
        data=request.data
        username=data['user']
        user=User.objects.get(username=username)
        print("passed1")
        myrequests = FriendRequest.objects.filter(user_from=request.user)
        print("passed2")
        for item in myrequests:
            if item.user_to==user:
                print("1 "+item.user_to.username+": "+user.username)
                return Response(status=status.HTTP_400_BAD_REQUEST)
        tomerequests = FriendRequest.objects.filter(user_to=request.user)
        for item in tomerequests:
            if item.user_from==user:
                print("2 "+item.user_from.username + ": " + user.username)
                return Response(status=status.HTTP_400_BAD_REQUEST)
        friendrequest = FriendRequest.objects.create(user_from=request.user, user_to=user, status=0)
        print(friendrequest.id)
        friendrequest.save()
        return Response(status=status.HTTP_200_OK)
    def get_queryset(self):
        username = self.request.user.username
        queryset = []
        for request in FriendRequest.objects.all():
            if request.status == 0:
                if username == request.user_to.username:
                    queryset.append(request)
                elif username == request.user_from.username:
                    queryset.append(request)
        return queryset

class FriendRequestDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FriendRequestSerializer
    queryset = FriendRequest.objects.all()
#permission - GET: if from or to / DELETE : if from or to / UPDATE : if to
#if UPDATE model change
    permission_classes = {permissions.IsAuthenticated, FriendRequestPermission}
#delete means request delete
#request delete is permitted for both user
    def patch(self, request, pk):
        print(request.data)
        friendrequest = FriendRequest.objects.get(id=pk)
        print(friendrequest.user_to)
        if friendrequest.user_from == request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
        serializer = FriendRequestSerializer(friendrequest, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
#1. get Users -> here request.user, friendrequest.user_to and vice versa
            me, me_created = MyFriend.objects.get_or_create(user=request.user)
            friend, friend_created= UsersForFriend.objects.get_or_create(friend=friendrequest.user_from)
            print(me)
            print(friend)
            friend.save()
            me.friend_list.add(friend)
            me.save()

#vice versa
            friend, friend_created = MyFriend.objects.get_or_create(user=friendrequest.user_from)
            me, me_created = UsersForFriend.objects.get_or_create(friend=request.user)
            me.save()
            friend.friend_list.add(me)
            friend.save()
            friendrequest.delete()
            return Response(status=status.HTTP_200_OK)
        friendrequest.save()
        return Response(status=status.HTTP_400_BAD_REQUEST)
#on patch status=1, update Myfriend serializer

#only get and delete method possible
class FriendList(generics.ListCreateAPIView):
    serializer_class = FriendSerializer
    permission_classes = {permissions.IsAuthenticated,}
    def get_queryset(self):
        queryset = []
        #if self.request.user.username=='sns_admin':
        #    return MyFriend.objects.all()
        MyFriend.objects.get_or_create(user=self.request.user)
        friend_list = MyFriend.objects.get(user=self.request.user);
        queryset.append(friend_list)
        return queryset

class FriendDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = FriendSerializer
    permission_classes = {permissions.IsAuthenticated, FriendDeletePermission}
    queryset = MyFriend.objects.all()
#friend delete for both user
    def patch(self, request, pk):
        friend_list,created = MyFriend.objects.get_or_create(id=pk)
        partner = request.data['user']
        for item in friend_list.friend_list.all():
            if item.friend.username == partner:
                print(item)
                friend_list.friend_list.remove(item)

        friend_list, created = MyFriend.objects.get_or_create(user=User.objects.get(username=partner))
        for item in friend_list.friend_list.all():
            if item.friend.username == request.user.username:
                friend_list.friend_list.remove(item)
        print(friend_list)
        return Response(status=status.HTTP_200_OK)

# return friend list by UserSerializer
class User_FriendList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = ( permissions.IsAuthenticated, )

    def get(self, request, format=None):
        users = User.objects.all()
        queryset = []
        MyFriend.objects.get_or_create(user=self.request.user)
        friend_list = MyFriend.objects.get(user=self.request.user).friend_list.all()
        # print(friend_list)

        for user in users:
            # print()
            # print(user.username)
            for friend in friend_list:
                # print(friend.friend.username)
                # print( user.username == friend.friend.username )
                if user.username == friend.friend.username:
                    queryset.append(user)
                    break
        # print( queryset )
        serializer = UserSerializer( queryset, many=True )
        return Response( serializer.data )

class ScheduleList(generics.ListCreateAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = ( permissions.IsAuthenticated, )

    def get_queryset(self):
        user = self.request.user
        return Schedule.objects.filter(user=user)

    def post(self, request, format=None):
        data = request.data.copy()
        data['start'] = datetime.datetime.fromtimestamp(float(data['start'])/1000)
        data['end'] = datetime.datetime.fromtimestamp(float(data['end'])/1000)

        serializer = ScheduleSerializer(data=data)
        if (serializer.is_valid()):
            serializer.save(user=self.request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)

class ShareScheduleList(generics.ListCreateAPIView):
    serializer_class = ShareScheduleSerializer
    permission_classes = ( permissions.IsAuthenticated, )

    def get_queryset(self):
        user = self.request.user
        return ShareSchedule.objects.filter(user_to=user)

    def post(self, request, format=None):
        data = request.data.copy()

        data['start'] = datetime.datetime.fromtimestamp(float(data['start'])/1000)
        data['end'] = datetime.datetime.fromtimestamp(float(data['end'])/1000)

        serializer = ScheduleSerializer(data=data)
        if (serializer.is_valid()):
            schedule = serializer.save(user=self.request.user)
            print(schedule.id)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        i = 1
        usern = 'user'+str(i)
        users = []
        while (i <= len(data)-3):
            users.append( User.objects.get(username=data[usern]))
            i = i+1
            usern = 'user'+str(i)
        for user in users:
            ShareSchedule.objects.create(user_from=request.user, user_to=user, schedule_id=schedule.id, status=0 )
        return Response(status=status.HTTP_200_OK)

class ScheduleDetail(generics.RetrieveAPIView):
    queryset = Schedule
    serializer_class = ScheduleSerializer
    permission_classes = ( permissions.IsAuthenticated, )
class ShareScheduleDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ShareSchedule
    serializer_class = ShareScheduleSerializer
    permission_classes = ( permissions.IsAuthenticated, )
    def put(self, request, pk, format=None):
        share_schedule = ShareSchedule.objects.get(id=pk)
        schedule = Schedule.objects.get(id=share_schedule.schedule_id)
        Schedule.objects.get_or_create(user=self.request.user, start=schedule.start, end = schedule.end, title=schedule.title)
        share_schedule.delete() 
        return Response(status=status.HTTP_200_OK)
