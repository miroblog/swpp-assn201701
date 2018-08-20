from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns
from sns_backend_rest import views

urlpatterns = [
        url(r'^users/$', views.UserList.as_view({'get': 'list',
                                                'post': 'create'})),
    url(r'^users/(?P<pk>[0-9]+)/$', views.UserDetail.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/email/$', views.UserEmailDetail.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/password/$', views.UserChangePasswordDetail.as_view()),
	url(r'^login/$', views.LoginList.as_view()),
    url(r'^posts/$', views.PostList.as_view()),
    url(r'^posts/(?P<pk>[0-9]+)/$', views.PostDetail.as_view()),
    url(r'^users/exists/$', views.UserExists.as_view()),
    url(r'^comments/$', views.CommentList.as_view()),
    url(r'^comments/like/$', views.UpdateLikeComment.as_view()),
    url(r'^posts/(?P<pk>[0-9]+)/comments/$', views.CommentDetail.as_view()),
    url(r'^posts/like/$', views.UpdateLikePost.as_view()),
	url(r'^rooms/$', views.ChatRoomList.as_view()),
	url(r'^rooms/(?P<pk>[0-9]+)/history/$', views.ChatRoomDetail.as_view()),
	url(r'^rooms/group/$', views.GroupChatRoomList.as_view()),
    url(r'^rooms/group/(?P<pk>[0-9]+)/history/$', views.GroupChatRoomDetail.as_view()),
    url(r'^userphotos/$', views.UserPhotoList.as_view()),
    url(r'^userphotos/(?P<pk>[0-9]+)/$', views.UserPhotoDetail.as_view()),
    url(r'^wall/(?P<name>[a-zA-Z0-9_]+)/$', views.WallList.as_view()),
    url(r'^friendrequest/$', views.FriendRequestList.as_view()),
    url(r'^friendrequest/(?P<pk>[0-9]+)/$', views.FriendRequestDetail.as_view()),
    url(r'^myfriend/$', views.FriendList.as_view()),
    url(r'^myfriend/(?P<pk>[0-9]+)/$', views.FriendDetail.as_view()),
    url(r'^friends/$', views.User_FriendList.as_view()),
    url(r'^vote/$', views.VotePoll.as_view()),
    url(r'^schedule/$', views.ScheduleList.as_view()),
    url(r'^schedule/(?P<pk>[0-9]+)/$', views.ScheduleDetail.as_view()),
	url(r'^shareschedule/$', views.ShareScheduleList.as_view()),
    url(r'^shareschedule/(?P<pk>[0-9]+)/$', views.ShareScheduleDetail.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]
