
from django.contrib import admin

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import UsersViewSet, GamesViewSet

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'games', GamesViewSet)

urlpatterns = [
    path('', include(router.urls)),
	path('admin/', admin.site.urls),
	path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
