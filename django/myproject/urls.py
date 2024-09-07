
from django.contrib import admin

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import UserCreateView, GameViewSet, ImageViewSet

from rest_framework_simplejwt.views import (
	TokenObtainPairView,
	TokenRefreshView,
)
# upload image
from myapp.views import ImageViewSet
# otp
from myapp.views import GetOTPView, VerifyOTPView

router = DefaultRouter()
# router.register(r'users', UserViewSet)
router.register(r'games', GameViewSet)
# image upload
router.register(r'images', ImageViewSet)

urlpatterns = [
	path('api/', include(router.urls)),
	path('api/users/', UserCreateView.as_view(), name='user-create'),
	path('admin/', admin.site.urls),
	path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
	path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
	path('api/get-otp/', GetOTPView.as_view(), name='get_otp'),
	path('api/verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
]
