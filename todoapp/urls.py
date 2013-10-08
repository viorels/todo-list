from django.conf.urls import patterns, include, url
from todoapp.api import TodoResource

todo_resource = TodoResource()

urlpatterns = patterns('',
    url(r'^$', 'todoapp.views.index', name='index'),
    url(r'^api/', include(todo_resource.urls)),

)