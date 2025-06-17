from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView as LoginView, TokenRefreshView

router = DefaultRouter()
router.register(r'notes', NoteViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('register/', RegisterView.as_view(), name='register'),  # ✅ /api/register/
    path('auth/login/', LoginView.as_view(), name='login'),      # ✅ /api/auth/login/
    path('auth/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
