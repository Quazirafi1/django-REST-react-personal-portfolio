from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework import status

class RegisterView(APIView):
    def post(self, request):
        # Check if a user already exists
        if User.objects.exists():
            return Response({"Error": "A user already exists. Only one user is allowed."}, status=status.HTTP_403_FORBIDDEN)        

        serializer = UserSerializer(data=request.data)
        # if serializer is not valid raise an exception to true
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

