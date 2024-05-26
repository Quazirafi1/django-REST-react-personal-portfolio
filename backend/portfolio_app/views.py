from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializer, AboutSerializer, SkillCategorySerializer, SkillSerializer
from .serializers import GroupedSkillSerializer, SustainabilitySerializer, ContactSerializer
from rest_framework.response import Response
from .models import User, About, SkillCategory, Skill, Sustainability, Contact
from rest_framework import status, viewsets
from rest_framework.exceptions import AuthenticationFailed
import jwt, datetime
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.decorators import action


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

    def get_queryset(self):
        # Return About objects ordered by date in descending order
        return About.objects.all().order_by('-date')

    
    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class SkillCategoryViewSet(viewsets.ModelViewSet):
    queryset = SkillCategory.objects.all()
    serializer_class = SkillCategorySerializer
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
    
class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def list(self, request, *args, **kwargs):
        # Fetch all SkillCategory objects and prefetch the related Skill objects for each category
        # using the 'skills' related name defined in the Skill model. This helps in reducing the number
        # of database queries when accessing related Skill objects for each SkillCategory.

        queryset = SkillCategory.objects.prefetch_related('skills').all()
        serializer = GroupedSkillSerializer(queryset, many=True)
        return Response(serializer.data)

    def perform_create(self, serializer):
        serializer.save()
        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
class SustainabilityViewSet(viewsets.ModelViewSet):
    queryset = Sustainability.objects.all()
    serializer_class = SustainabilitySerializer
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
    
    #Removing request from the method signature will lead to errors
    @action(detail=False, methods=['get'], url_path='latest', url_name='latest')
    def latest(self, request):
        latest_entry = self.get_queryset().order_by('-id').first()
        if latest_entry:
            serializer = self.get_serializer(latest_entry)
            return Response(serializer.data)
        else:
            return Response({'detail': 'No entries found.'}, status=status.HTTP_404_NOT_FOUND)


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
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
    
    #Removing request from the method signature will lead to errors
    @action(detail=False, methods=['get'], url_path='latest', url_name='latest')
    def latest(self, request):
        latest_entry = self.get_queryset().order_by('-id').first()
        if latest_entry:
            serializer = self.get_serializer(latest_entry)
            return Response(serializer.data)
        else:
            return Response({'detail': 'No entries found.'}, status=status.HTTP_404_NOT_FOUND)
    
