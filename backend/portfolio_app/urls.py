from django.urls import path, include
from . views import RegisterView, LoginView, LogoutView, AboutViewSet, SkillCategoryViewSet
from . views import SkillViewSet, SustainabilityViewSet, ContactViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'about', AboutViewSet, basename='about')
router.register(r'skill-category', SkillCategoryViewSet, basename='skill-category')
router.register(r'skill', SkillViewSet, basename='skill')
router.register(r'sustainability', SustainabilityViewSet, basename='sustainability')
router.register(r'contact', ContactViewSet, basename='contact')

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('logout/', LogoutView.as_view()),
    path('', include(router.urls)),
]


###########################################Notes#######################################
# request body for contact POST:
# {
#     "contact_description": "sustainability_title_2",
#     "socials": {
#             "email": "abc@abc.com",
#             "linkedin": "link_linkedin",
#             "github": "link_git"
#         }
# }