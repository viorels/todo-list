from django.conf.urls import patterns, include, url
from tastypie.api import Api

from todoapp.api import UserResource, TodoResource

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(TodoResource())

urlpatterns = patterns('',
    url(r'^$', 'todoapp.views.index', name='index'),
    url(r'^api/', include(v1_api.urls)),

)