from django.conf.urls import patterns, include, url
from django.views.generic import RedirectView
from tastypie.api import Api

from todoapp.api import UserResource, TodoResource

v1_api = Api(api_name='v1')
v1_api.register(UserResource())
v1_api.register(TodoResource())

urlpatterns = patterns('',
    url(r'^$', 'todoapp.views.index', name='index'),
    url(r'^api/', include(v1_api.urls)),
	url(r'^accounts/', include('registration.backends.simple.urls')),
	url(r'^users/', RedirectView.as_view(url='/')),
)