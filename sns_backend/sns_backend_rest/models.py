from django.db import models
from django.contrib.auth.models import User
from PIL import Image
# from django.contrib.auth.models import AbstractUser
# from django.contrib.auth import get_user_model
# from django.conf import settings

# class User(AbstractUser):
    # integer = models.IntegerField()
    # pass
    # photo = models.ImageField('upload photo', null=True)

# User = get_user_model()

class Wall(models.Model):
    owner = models.ForeignKey(User, related_name='wall_owner', on_delete=models.CASCADE)
    posts = models.ManyToManyField('Post', related_name="wall_posts", blank=True)

class UserPhoto(models.Model):
    user = models.ForeignKey(User, related_name='photo_user', on_delete=models.CASCADE)
    photo = models.ImageField('upload photo', null=True)

    def save(self, *args, **kwargs):
        if not self.photo:
            return

        super(UserPhoto, self).save()
        image = Image.open(self.photo)

        width = image.size[0]
        height = image.size[1]

        # crop the image to make square
        if width > height:
            image = image.crop(
                (
                    (width/2) - (height/2),
                    0,
                    (width/2) + (height/2),
                    height
                )
            )
        else:
            image = image.crop(
                (
                    0,
                    (height/2) - (width/2),
                    width,
                    (height/2) + (width/2)
                )
            )

        size = (224, 224)
        image = image.resize(size, Image.ANTIALIAS)
        image.save(self.photo.path)


class Login(models.Model):
    user = models.ForeignKey(User, related_name='login_user', on_delete=models.CASCADE, null=True)
    time = models.DateTimeField(auto_now_add=True)


class LikePost(models.Model):
    post_id = models.ForeignKey('Post', related_name='like_post', on_delete=models.CASCADE)
    emoji = models.TextField()
    by = models.ForeignKey(User, related_name='emoji_post_user', on_delete=models.CASCADE)


class LikeComment(models.Model):
    comment_id = models.ForeignKey('Comment', related_name='like_comment', on_delete=models.CASCADE)
    emoji = models.TextField(blank=True, null=True)
    by = models.ForeignKey(User, related_name='emoji_comment_user', on_delete=models.CASCADE)

class Post(models.Model):
    user = models.ForeignKey(User, related_name='post_user', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    text = models.TextField(null=True)
    like_list = models.ManyToManyField(LikePost, related_name="like_post_users", blank=True)
    comment_count = models.IntegerField(default=0)
    image = models.ImageField('upload image', null=True)
    poll = models.ForeignKey('Poll', related_name="post_poll", on_delete=models.CASCADE, null=True)

class Poll(models.Model):
    user = models.ForeignKey(User, related_name='poll_owner', on_delete=models.CASCADE)
    question = models.TextField(blank=True, null=True)
    options = models.ManyToManyField('Option', related_name="poll_options", blank=True)
    voters = models.ManyToManyField(User, related_name="poll_voters", blank=True)

class Option(models.Model):
    text = models.TextField(null=True)
    vote = models.IntegerField(default=0)

class Comment(models.Model):
    post = models.ForeignKey(Post, related_name='comment', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='comment_user', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)
    comment = models.TextField()
    like_list = models.ManyToManyField(LikeComment, related_name="like_comment_users", blank=True)


class ChatRoom(models.Model):
    user1 = models.ForeignKey(User, related_name='chatroom_user1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User, related_name='chatroom_user2', on_delete=models.CASCADE)


class ChatMessage(models.Model):
    room = models.ForeignKey(ChatRoom, related_name='chat_message', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(null=True)
    time = models.DateTimeField(auto_now_add=True)
    image = models.ImageField('upload image', null=True)

class GroupChatRoom(models.Model):
    user = models.ManyToManyField(User)
    time = models.DateTimeField(auto_now_add=True)
#    user = models.ForeignKey('auth.User', related_name='groupchat_room', on_delete=models.CASCADE)

class GroupChatMessage(models.Model):
    room = models.ForeignKey(GroupChatRoom, related_name='groupchat_message', on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField(null=True)
    time = models.DateTimeField(auto_now_add=True)
    image = models.ImageField('upload image', null=True)

from django.db.models.signals import post_save
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        wall = Wall(owner=instance)
        wall.save()

post_save.connect(create_user_profile, sender=User)


class FriendRequest(models.Model):
    user_from = models.ForeignKey(User, related_name='friendrequest_from_user', on_delete=models.CASCADE)
    user_to = models.ForeignKey(User, related_name='friendrequest_to_user',on_delete=models.CASCADE)
    status = models.IntegerField(null=True)
    time = models.DateTimeField(auto_now_add=True)

class UsersForFriend(models.Model):
    friend = models.ForeignKey(User, related_name='user_friend', on_delete=models.CASCADE)
    time = models.DateTimeField(auto_now_add=True)

class MyFriend(models.Model):
    user = models.ForeignKey(User, related_name='user_self', on_delete=models.CASCADE)
    friend_list = models.ManyToManyField(UsersForFriend, related_name="my_list", blank=True)

class Schedule(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start = models.DateTimeField()
    end = models.DateTimeField()
    title = models.CharField(max_length=200)

class ShareSchedule(models.Model):
    user_from = models.ForeignKey(User, related_name='share_from', on_delete=models.CASCADE)
    user_to = models.ForeignKey(User, related_name='share_to',on_delete=models.CASCADE)
    schedule_id = models.IntegerField()
    status = models.IntegerField(null=True)
    time = models.DateTimeField(auto_now_add=True)
