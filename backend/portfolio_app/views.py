from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer
from rest_framework.response import Response
from .models import User
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime

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


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        
        if not token:
            raise AuthenticationFailed({'Error': 'Unauthenticated'})
        
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed({'Error': 'Unauthenticated'})
        except jwt.ImmatureSignatureError:
            raise AuthenticationFailed({'Error': 'Token is not yet valid (iat)'})
    
        user = User.objects.filter(id=payload['id']).first()
        # since user ain't JSON serializable 
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message':'successfully logged out'
        }
        
        return response