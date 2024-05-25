from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer, AboutSerializer
from rest_framework.response import Response
from .models import User, About
from rest_framework import status, viewsets
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from rest_framework.permissions import IsAuthenticatedOrReadOnly

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
    
class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']
        
        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed({"Error": "User not found"})
        
        if not user.check_password(password):
            raise AuthenticationFailed({"Error": "Incorrect Password"})
        
        # payload for jwt
        payload = {
            'id': user.id,
            'exp': datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.now(datetime.timezone.utc)
        }
        
        # Encode the payload into a JWT token using the secret key 'secret' and the HS256 algorithm
        token = jwt.encode(payload, 'secret', algorithm='HS256')
        
        response =  Response()
        
        # Set a cookie named 'jwt' with the JWT token as its value, and mark it as HttpOnly to prevent access via JavaScript (Front End)
        response.set_cookie(key='jwt', value=token, httponly=True)
        
        response.data = {
            'jwt': token
        }
        
        return response 
    
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'successfully logged out'
        }
        
        return response
    
class AboutViewSet(viewsets.ModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user = self.request.user
        
        serializer.save(user=user)
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)