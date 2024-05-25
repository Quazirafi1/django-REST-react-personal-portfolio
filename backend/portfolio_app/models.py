from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    password =  models.CharField(max_length=128)
    username = None
    
    # email will be the username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email
    
class About(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateField() # This will store MM/YYYY in a date format
    description = models.TextField()

    def __str__(self):
        return f"{self.user.email} - {self.date.strftime('%B %Y')}"

