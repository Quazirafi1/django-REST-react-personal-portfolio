from rest_framework import serializers
from .models import User, About
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
        fields = ['id', 'user', 'date', 'description']

