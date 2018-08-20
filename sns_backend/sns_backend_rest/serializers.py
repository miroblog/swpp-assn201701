from rest_framework import serializers
# from facebook_backend_rest.models import
from django.contrib.auth.models import User
from sns_backend_rest.models import Login, Post, Comment, ChatRoom, ChatMessage, LikePost, LikeComment, GroupChatRoom, GroupChatMessage, UserPhoto, Wall, Poll, Option, Schedule, ShareSchedule
from django.contrib.auth.password_validation import validate_password

class WallSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wall
        fields = ('posts')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'username')

    def create(self, validated_data):
        user = User(email=validated_data['email'], username=validated_data['username'])
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email')

class ChangePasswordSerializer( serializers.Serializer ):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password( self, value ):
        validate_password(value)
        return value

class UserPhotoSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = UserPhoto
        fields = ( 'id', 'user', 'photo', )

class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = Login
        fields = ('user', 'time',)


class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

class LikePostSerializer(serializers.ModelSerializer):
    by = serializers.ReadOnlyField(source='by.username')

    class Meta:
        model = LikePost
        fields = ('emoji', 'by')


class LikeCommentSerializer(serializers.ModelSerializer):
    by = serializers.ReadOnlyField(source='by.username')

    class Meta:
        model = LikeComment
        fields = ('emoji', 'by')

class OptionSerialzier(serializers.ModelSerializer):
    class Meta:
        model = Option
        fields = ('id', 'text', 'vote')

class PollSerializer(serializers.ModelSerializer):
    options = OptionSerialzier(many=True, read_only=True)
    voters = UserNameSerializer(many=True, read_only=True)
    class Meta:
        model = Poll
        fields = ('id', 'question','options', 'voters')

class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    like_list = LikePostSerializer(many=True, read_only=True)
    comment_count = serializers.SerializerMethodField()
    poll = PollSerializer()
    class Meta:
        model = Post
        fields = ('id', 'user', 'time', 'text', 'like_list', 'comment_count', 'image', 'poll')
    def get_comment_count(self, obj):
        return Comment.objects.filter(post=obj.id).count()


class CommentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    like_list = LikeCommentSerializer(many=True, read_only=True)
    class Meta:
        model = Comment
        fields = ('id', 'post', 'user', 'comment', 'time', 'like_list',)


class ChatRoomSerializer(serializers.ModelSerializer):
    user1 = serializers.ReadOnlyField(source='user1.username')
    user2 = serializers.SerializerMethodField()

    class Meta:
        model = ChatRoom
        fields = ('id', 'user1', 'user2',)

    def get_user2(self, obj):
        return obj.user2.username


class ChatMessageSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = ChatMessage
        fields = ('room', 'user', 'text', 'time', 'image',)

class GroupChatRoomSerializer(serializers.ModelSerializer):
    user = UserNameSerializer(many=True)
    class Meta:
        model = GroupChatRoom
        fields = ('id', 'user','time')

class UserNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ( 'username',)



class GroupChatMessageSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = GroupChatMessage
        fields = ('room', 'user', 'text', 'time', 'image',)


from sns_backend_rest.models import FriendRequest
class FriendRequestSerializer(serializers.ModelSerializer):
    user_from = serializers.ReadOnlyField(source='user_from.username')
    class Meta:
        model = FriendRequest
        fields = ('id', 'user_from', 'user_to', 'status', 'time',)
    def to_representation(self, obj):
        data = super(FriendRequestSerializer, self).to_representation(obj)
        data.update(user_to=obj.user_to.username)
        return data

from sns_backend_rest.models import UsersForFriend, MyFriend
class FriendUserListSerializer(serializers.ModelSerializer):
    friend = serializers.ReadOnlyField(source='friend.username')
    class Meta:
        model = UsersForFriend
        fields = ('friend', 'time' )

class FriendSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    friend_list = FriendUserListSerializer(many=True, read_only=True)
    class Meta:
        model = MyFriend
        fields = ('id', 'user', 'friend_list')

class ScheduleSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Schedule
        fields = ('user', 'start', 'end', 'title',)

class ScheduleSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Schedule
        fields = ('id', 'user', 'start', 'end', 'title',)

class ShareScheduleSerializer(serializers.ModelSerializer):
    user_from = serializers.ReadOnlyField(source='user_from.username')
    user_to = serializers.ReadOnlyField(source='user_to.username')

    class Meta:
        model = ShareSchedule
        fields = ('id','user_from', 'user_to', 'status', 'schedule_id','time')

