from django.urls import path, include
from . views import RegisterView, LoginView, LogoutView, AboutViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'about', AboutViewSet, basename='about')

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('', include(router.urls)),
]
