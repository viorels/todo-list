from django.contrib.auth import get_user_model
from tastypie import fields
from tastypie.authentication import MultiAuthentication, SessionAuthentication, BasicAuthentication
from tastypie.authorization import Authorization
from tastypie.exceptions import Unauthorized
from tastypie.resources import ModelResource
from todoapp.models import Todo


class UserObjectsOnlyAuthorization(Authorization):
    def read_list(self, object_list, bundle):
        # This assumes a ``QuerySet`` from ``ModelResource``.
        return object_list.filter(user=bundle.request.user)

    def read_detail(self, object_list, bundle):
        # Is the requested object owned by the user?
        return bundle.obj.user == bundle.request.user

    def create_list(self, object_list, bundle):
        # Assuming their auto-assigned to ``user``.
        return object_list

    def create_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def update_list(self, object_list, bundle):
        allowed = []

        # Since they may not all be saved, iterate over them.
        for obj in object_list:
            if obj.user == bundle.request.user:
                allowed.append(obj)

        return allowed

    def update_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def delete_list(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user

    def delete_detail(self, object_list, bundle):
        return bundle.obj.user == bundle.request.user


class UserResource(ModelResource):
    class Meta:
        queryset = get_user_model().objects.all()
        resource_name = 'user'
        fields = ['username', 'first_name']
        detail_allowed_methods = ['get']
        list_allowed_methods = []


class TodoResource(ModelResource):
    user = fields.ForeignKey(UserResource, 'user')

    class Meta:
        queryset = Todo.objects.all()
        resource_name = 'todo'
        authentication = MultiAuthentication(BasicAuthentication(), SessionAuthentication())
        authorization = UserObjectsOnlyAuthorization()
        always_return_data = True

    def hydrate(self, bundle, request=None):
        bundle.obj.user = bundle.request.user
        return bundle