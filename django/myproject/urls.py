
from django.contrib import admin

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myapp.views import UsersViewSet, GamesViewSet

router = DefaultRouter()
router.register(r'users', UsersViewSet)
router.register(r'games', GamesViewSet)

urlpatterns = [
    path('', include(router.urls)),
	path('admin/', admin.site.urls),
]
