from django.db import models
from django.conf import settings
from django.utils import timezone
# Create your models here.
class Message(models.Model):
	text = models.CharField(max_length=100)
	user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
	date = models.DateTimeField(default=None,null=True)

	#date = models.DateTimeField()
	#models.DateTimeField(default=None,null=True)