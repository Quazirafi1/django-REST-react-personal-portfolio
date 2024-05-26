from rest_framework import serializers
from .models import User, About, SkillCategory, Skill, Sustainability, Contact
from django.core.validators import validate_email
from django.core.exceptions import ValidationError as DjangoValidationError
import re
from datetime import datetime

class CustomDateField(serializers.DateField):
    def to_internal_value(self, value):
        # Expecting "MM/YYYY"
        try:
            return datetime.strptime(value, '%m/%Y').date()
        except ValueError:
            raise serializers.ValidationError("Date format must be MM/YYYY")
    
    def to_representation(self, value):
        # Format date as MM/YYYY
        return value.strftime('%m/%Y')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'name', 'email', 'password'] 

        # password won't be returned after user is created
        extra_kwargs = {
            'password': {'write_only':True}
        }
        
    def validate_email(self, value):
        try:
            validate_email(value)
        except DjangoValidationError:
            raise serializers.ValidationError("Invalid email format")
        return value

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        if not re.search(r'[A-Za-z]', value):
            raise serializers.ValidationError("Password must contain at least one letter")
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one digit")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Password must contain at least one special character")
        return value
    
    # hashing the password before saving to db
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

class AboutSerializer(serializers.ModelSerializer):
    date = CustomDateField()
    user = UserSerializer(read_only=True) #nested user serializer
    class Meta:
        model = About
        fields = ['id', 'user', 'date', 'title', 'description']
        
    
class SkillCategorySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    
    class Meta:
        model = SkillCategory
        fields = ['id', 'user', 'category_name']
        
class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'skill', 'skill_category']
        
class GroupedSkillSerializer(serializers.Serializer):
    skill_category_id = serializers.IntegerField(source='id')
    skill_category_name = serializers.CharField(source='category_name')
    skills = SkillSerializer(many=True)

    class Meta:
        fields = ['skill_category_id', 'skill_category_name', 'skills']
        
class SustainabilitySerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    
    class Meta:
        model = Sustainability
        fields = ['id', 'user', 'sustainability_title', 'sustainability_description']

class SocialsSerializer(serializers.Serializer):
    email = serializers.CharField(max_length=255, required=False, allow_null=True)
    linkedin = serializers.CharField(max_length=2048, required=False, allow_null=True)
    github = serializers.CharField(max_length=2048, required=False, allow_null=True)    
   
class ContactSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True) 
    #Nested Serializer (SocialsSerializer) handles the nested structure of socials.
    socials = SocialsSerializer(write_only=True)
    socials_data = SocialsSerializer(source='*', read_only=True)


    class Meta:
        model = Contact
        fields = ['id', 'user', 'contact_description', 'socials','socials_data']
        
    def create(self, validated_data):
        # extract the 'socials' key from the validated_data dictionary
        # if the key does not exist, it returns an empty dictionary {} 
        socials_data = validated_data.pop('socials', {})
        contact = Contact.objects.create(
            #self.context['request'] gives access to the current request object, 
            # and .user retrieves the authenticated user
            user=self.context['request'].user,
            contact_description=validated_data['contact_description'],
            email=socials_data.get('email'),
            linkedin=socials_data.get('linkedin'),
            github=socials_data.get('github')
        )
        return contact

