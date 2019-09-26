from django.db import models

# Create your models here.
class article(models.Model):
    title = models.CharField(max_length=30)
    author = models.CharField(max_length=8)
    content = models.TextField()
    sectile = models.CharField(max_length=50, null=True)
    time = models.DateTimeField()
