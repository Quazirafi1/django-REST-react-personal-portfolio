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
    title = models.CharField(max_length=512, default='Default Title')

    def __str__(self):
        return f"{self.user.email} - {self.date.strftime('%B %Y')}"

class SkillCategory(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    category_name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.user.email} - {self.category_name}"

# related_name='skills': This attribute in the ForeignKey field specifies the name to use for the reverse
# relation from SkillCategory to Skill. This means that from a SkillCategory instance, you can access all 
# related Skill instances using the skills attribute.    
class Skill(models.Model):
    skill_category = models.ForeignKey(SkillCategory, related_name='skills', on_delete=models.CASCADE)
    skill = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.skill_category} - {self.skill}"
    
class Sustainability(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    sustainability_title = models.CharField(max_length=512, null=True)
    sustainability_description = models.TextField()
    
    def __str__(self):
        return f"{self.sustainability_title}"
    
class Contact(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    contact_description = models.TextField()
    email = models.CharField(max_length=255, null=True)
    linkedin = models.CharField(max_length=2048, null=True)
    github = models.CharField(max_length=2048, null=True)
    
    def __str__(self):
        return f"{self.email}-{self.linkedin}-{self.github}"