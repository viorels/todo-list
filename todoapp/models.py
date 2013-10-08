from django.db import models
from django.conf import settings


class Todo(models.Model):
    title = models.CharField(max_length=200)
    completed = models.BooleanField(default=False)
    priority = models.IntegerField(default=1)
    due = models.DateField()
    user = models.ForeignKey(settings.AUTH_USER_MODEL)

    def __unicode__(self):  # Python 3: def __str__(self):
        return self.title