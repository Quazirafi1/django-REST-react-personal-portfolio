from django.urls import path, include
from . views import RegisterView, LoginView, LogoutView, AboutViewSet, SkillCategoryViewSet, SkillViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'about', AboutViewSet, basename='about')
router.register(r'skill-category', SkillCategoryViewSet, basename='skill-category')
router.register(r'skill', SkillViewSet, basename='skill')

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('', include(router.urls)),
]
